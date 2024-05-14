# SMARTIX-CHALLENGE

Uma API REST de cadastro de usuário com autenticação em dois fatores via email.

Eu gravei um vídeo iniciando a aplicação e mostrando todos os endpoints funcionando, você poderá assistir ele [aqui](https://youtu.be/tWdm7hdbVcU).

Utilizei o [MailCatcher](https://mailcatcher.me/) para o recebimento de emails, basta acessar http://127.0.0.1:1080/.

## Pré-requisitos

- node >= 21.6.0
- npm >= 10.2.4
- docker >= 24.0.7
- docker-compose >= 1.29.2

## Install and start

Intale o projeto e inicie com [NPM](https://nodejs.org/en) or [Yarn](https://yarnpkg.com/).
Você irá precisar renomear o arquivo ```.env.sample``` para ```.env```

```bash
git clone https://github.com/marcuuscardoso/smartix-cahllenge.git
cd smartix-challenge
yarn
docker-compose up -d
yarn start:dev
```
or 

```bash
git clone https://github.com/marcuuscardoso/smartix-cahllenge.git
cd smartix-challenge
npm install
docker-compose up -d
npm run start:dev
```

## Docs
Todos os endpoints da aplicação foram documentados utilizado [Postman](https://www.postman.com/downloads/), você pode acessar a coleção do postman [aqui](https://www.postman.com/winter-zodiac-779832/workspace/smartix-challenge).

---
### Authorization
Create OTP Code
```http
POST /auth
Host: localhost:3000
Content-Type: application/json

Body
{
    "email": "marcus@example.com",
    "password": "testpassword"
}
```
Response:
```typescript
{
    "message": string
}
```
----
Create Access Token (With OTP Code)
```http
POST /auth
Host: localhost:3000
Content-Type: application/json

Body
{
    "email": "marcus@example.com",
    "password": "testpassword",
    "otpCode": "0123456"
}
```
Response:
```typescript
{
    "access_token": string
}
```

---
### Users
Get all users
```http
GET /users
Host: localhost:3000
Authorization: Bearer access_token
```
Response:
```typescript
[
    {
        "id": number,
        "name": string,
        "email": string,
        "phone": string,
        "password": string,
        "createdAt": Date,
        "updatedAt": Date
    },
    ...
]
```
----
Get Single User
```http
GET /users/<userid>
Host: localhost:3000
Authorization: Bearer access_token
```
Response:
```typescript
{
    "id": number,
    "name": string,
    "email": string,
    "phone": string,
    "password": string,
    "createdAt": Date,
    "updatedAt": Date
}
```
---
Create User
```http
POST /users/
Host: localhost:3000
Content-Type: application/json
Authorization: Bearer access_token

Body
{
    "name": string,
    "email": string,
    "phone": string,
    "password": string
} 
```
---
Update User
```http
PATCH /users/<userid>
Host: localhost:3000
Content-Type: application/json
Authorization: Bearer access_token

Body: something you want to update, by example:
{
    "email": string
}
```
---
Delete User
```http
DELETE /users/<userid>
Host: localhost:3000
Authorization: Bearer access_token
```