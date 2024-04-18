import express from 'express';
import session from 'express-session';
import jwt from 'jsonwebtoken';
import crypto from 'crypto';

declare module "express-session" {
    interface SessionData {
        nonce: string;
    }
  }

const app = express();

const memoryStore = new session.MemoryStore();

app.use(
    session({
        secret: 'my-secret',
        resave: false,
        saveUninitialized: false,
        store: memoryStore,
    })
)

app.get('/login', (req, res) => {
    const nonce = crypto.randomBytes(16).toString('base64');

    req.session.nonce = nonce;
    req.session.save();

    const loginParams = new URLSearchParams({
        client_id: 'fullcycle-client',
        redirect_uri: 'http://localhost:3000/callback',
        response_type: 'code',
        scope: 'openid',
        nonce,
    })

    const url = `http://localhost:8080/realms/fullcycle-realm/protocol/openid-connect/auth?${loginParams.toString()}`;
    console.log(url);
    res.redirect(url);
});


app.get('/callback', async (req, res) => {
    console.log(req.query);

    const bodyParams = new URLSearchParams({
        client_id: 'fullcycle-client',
        grant_type: 'authorization_code',
        code: req.query.code as string,
        redirect_uri: 'http://localhost:3000/callback', 
    });

    const url = `http://host.docker.internal:8080/realms/fullcycle-realm/protocol/openid-connect/token`;

    const response = await fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: bodyParams.toString(),
    });

    const result = await response.json();

    console.log(result);

    const payloadAccessToken = jwt.decode(result.access_token) as any;
    const payloadRefreshToken = jwt.decode(result.refresh_token) as any;
    const payloadIdToken = jwt.decode(result.id_token) as any;

    if(payloadAccessToken.nonce !== req.session.nonce
        || payloadRefreshToken.nonce !== req.session.nonce
        || payloadIdToken.nonce !== req.session.nonce
    ) {
        return res.status(401).send({message: 'Unauthenticated'});
    }


    res.json(result);
});

app.listen(3000, () => {
    console.log('Listening on port 3000');
});