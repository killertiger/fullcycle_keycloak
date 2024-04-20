import express from 'express';
import session from 'express-session';
import jwt from 'jsonwebtoken';
import crypto from 'crypto';

declare module "express-session" {
    interface SessionData {
        nonce: string;
        state: string;
    }
}

const app = express();
app.use(express.urlencoded({ extended: true }));

const memoryStore = new session.MemoryStore();

app.use(
    session({
        secret: 'my-secret',
        resave: false,
        saveUninitialized: false,
        store: memoryStore,
    })
);

const middlewareIsAuth = (
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
) => {
    //@ts-expect-error - type mismatch
    if (!req.session.user) {
        return res.redirect("/login");
    }
    next();
};

app.get('/login', (req, res) => {
    //@ts-expect-error type mismatch
    if (req.session.user) {
        return res.redirect('/admin');
    }
    res.sendFile(__dirname + '/login.html');
});

app.post('/login', async (req, res) => {
    const { username, password } = req.body;

    const bodyParams = new URLSearchParams({
        client_id: 'fullcycle-client',
        grant_type: 'password',
        username,
        password,
        scope: 'openid',
    });

    const response = await fetch('http://host.docker.internal:8080/realms/fullcycle-realm/protocol/openid-connect/token', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: bodyParams.toString(),
    });

    const result = await response.json();
    console.log(result);
    //@ts-expect-error - type mismatch
    req.session.user = result;
    req.session.save();

    res.redirect('/admin');
});

app.get('/logout', async (req, res) => {
    // const logoutParams = new URLSearchParams({
    //     //@ts-expect-error - type mismatch
    //     id_token_hint: req.session.user.id_token,
    //     post_logout_redirect_uri: 'http://localhost:3000/login',
    // });

    // req.session.destroy(() => {
    //     console.log('Session destroyed');
    // });

    // const url = "http://localhost:8080/realms/fullcycle-realm/protocol/openid-connect/logout?" + logoutParams.toString();
    // res.redirect(url);

    const response = await fetch(
        'http://host.docker.internal:8080/realms/fullcycle-realm/protocol/openid-connect/revoke',
        {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: new URLSearchParams({
                client_id: "fullcycle-client",
                //@ts-expect-error - type mismatch
                token: req.session.user.access_token,
            }).toString(),
        }
    );

    req.session.destroy(() => {
        console.log('Session destroyed');
    });

    res.redirect("/login");
});

app.get('/callback', async (req, res) => {
    console.log(req.query);

    if (req.query.state !== req.session.state) {
        return res.status(401).send({ message: 'Unauthenticated' });
    }

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

    if (payloadAccessToken.nonce !== req.session.nonce
        || payloadRefreshToken.nonce !== req.session.nonce
        || payloadIdToken.nonce !== req.session.nonce
    ) {
        return res.status(401).send({ message: 'Unauthenticated' });
    }


    res.json(result);
});

app.get("/admin", middlewareIsAuth, (req, res) => {
    //@ts-expect-error - type mismatch
    res.json(req.session.user);
});

app.listen(3000, () => {
    console.log('Listening on port 3000');
});