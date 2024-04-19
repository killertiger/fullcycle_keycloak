# Full Cycle - Keycloak

Based on the course: "Full Cycle 3.0 - Keycloak"

## External references

External mail server used to debug and test an application:
https://mailtrap.io/


https://jwt.io/
allows you to decode, verify and generate JWT

Docker Image: https://quay.io/repository/keycloak/keycloak 

Recommended VS Code Extension:

Name: REST Client
Id: humao.rest-client
Description: REST Client for Visual Studio Code
Version: 0.25.1
Publisher: Huachao Mao
VS Marketplace Link: https://marketplace.visualstudio.com/items?itemName=humao.rest-client



Name: PlantUML
Id: jebbs.plantuml
Description: Rich PlantUML support for Visual Studio Code.
Version: 2.18.1
Publisher: jebbs
VS Marketplace Link: https://marketplace.visualstudio.com/items?itemName=jebbs.plantuml

## Accessing application

### Keycloak - Web App

http://localhost:8080/

User: admin

Password: admin


### Database
docker image: mysql:8.0-debian

Mysql debian images are usually smaller

### Running application

Add the following line on `/etc/hosts`
```
127.0.0.1 host.docker.internal
```

```
$ docker compose up -d
```


### Setup realm, client

Create a realm: fullcycle-realm
Create client: fullcycle-client
- Root URL: http://localhost:3000

Create a user:
- username: user@user.com
- email: user@user.com
- first name: User
- last name: Name
- check email validated
- Create password: 123456


### Testing 

Open the  `api.http`


### Authorization flow
http://localhost:3000/login
user@user.com
123456

```
$ docker exec -it app bash
$ npm run authentication-code
```