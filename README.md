# Full Cycle - Keycloak

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


http://localhost:8080/
User: admin
Password: admin


db:
mysql:8.0-debian
mysql debian images are usually smaller

```
$ docker compose up -d
```

Roles can be created by:
- Realm or Client


Create a realm: fullcycle-realm
Create client: fullcycle-client
Create a user:
- username: user@user.com
- email: user@user.com
- first name: User
- last name: Name
- check email validated
- Create password: 123456


## Testing 

Open the  `api.http`
