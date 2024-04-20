Setup:

docker compose up -d


Select the fullcycle-realm
- Clients
- fullcycle-client
- Check `Implicit flow`
- Save

### Running application

```
$ docker compose -it app bash
$ npm run implicit
```


Urls:
http://localhost:3000/admin -> Private route
http://localhost:3000/login
http://localhost:3000/logout