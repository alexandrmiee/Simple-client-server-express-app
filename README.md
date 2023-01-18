## Simple client-server express app

Develop a client-server solution using typescript and node.js to store and manage a database of cars of various brands.

The solution should consist of two applications: server and client. Applications should use the following technologies:

Server application:

1. Node.JS
2. Typescript
3. Express or any express compatible web server
4. REST API
5. Methods that allow you to add cars, delete, change existing ones and get a list by brands with sorting (classic CRUD). Publish these methods to the REST API
6. User authentication when connecting to a separate REST API method using login, password
7. User authorization when connecting via REST API using the Authorization: Bearer HTTP header
8. MongoDB database for persistent storage of information about cars. As a MongoDB server, choose any of your choice, you can public MongoDB Atlas
9. Write some unit tests using jest or mocha to test the CRUD functionality from step 5, preferably without using the REST API. Choose your coverage level.

Client application:

1. Node.JS
   2.Typescript
2. Command line interpreter. The parameters must contain login, password, action and arguments of this action in any format.
3. When launched from the command line with parameters, you need to connect to the Server and perform REST API operations.
4. Output the data received from the Server to the console.

Sample structure "Car":

- Brand
- Name
- Production year
- Price
- any additional fields that are needed to solve the problem

##### Node version

v16.13.2 (see .nvmrc)

## Server

### Prepare

- Run Mongodb with docker

  `docker run -d -p 27017:27017 --name mongo mongo:latest`

- Setup configs in

  `server/config/config.service.ts`

## Run

`npm run start:server`

### Unit tests

`npm run test`

## Client

Use it like a cURL

**Sing up**

```
npm run start:client -- --request POST 'http://127.0.0.1:5000/users/' \
--header 'Content-Type: application/json' \
--data '{
    "login": "ulogin",
    "password": "upassword"
}'
```

**Sing in**

```
npm run start:client -- --request POST 'http://127.0.0.1:5000/singIn/' \
--header 'Content-Type: application/json' \
--data '{
    "login": "ulogin",
    "password": "upassword"
}'
```

Get `accessToken` from response

**GET Cars**

```
npm run start:client -X GET\
 'http://127.0.0.1:5000/cars/?brand=string1&price=1.1' --header 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYzYzcwMWE3ZGM5MTA0NWI2MTRlZmQwYSIsInR5cGUiOiJ1c2VyIiwiaWF0IjoxNjczOTg2NjI2LCJleHAiOjE2NzM5OTM4MjZ9.Pdcq-OWbC40dxB0ZR2XLkcDS9yZBcnf3bKRF4Gb4mJM'
```

**POST Car**

```
npm run start:client -- --request POST 'http://127.0.0.1:5000/cars/' --header 'Content-Type: application/json' --data '{
    "brand": "new",
    "name": "new",
    "year": "new",
    "price": 1.1
}' --header 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYzYzc4ZDUzYTk5YWFkZTBiZTg1MGI1ZSIsInR5cGUiOiJ1c2VyIiwiaWF0IjoxNjc0MDIyMjc3LCJleHAiOjE2NzQwMjk0Nzd9._kwEvTpCjNKrLzS4W5vKfYfesTmrode_1n4i8oha5dk'
```

**DELETE Car**

```
npm run start:client -- --request DELETE 'http://127.0.0.1:5000/cars/63c7134ce91fb9aa751f776d' --header 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYzYzcwMWE3ZGM5MTA0NWI2MTRlZmQwYSIsInR5cGUiOiJ1c2VyIiwiaWF0IjoxNjczOTg2NjI2LCJleHAiOjE2NzM5OTM4MjZ9.Pdcq-OWbC40dxB0ZR2XLkcDS9yZBcnf3bKRF4Gb4mJM'
```

## TODO

- swagger
- refresh token
- add offset for cars request
- more test
- yargs types
- jest mock types
