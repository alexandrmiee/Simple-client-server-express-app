Клиентское приложение:

1. Node.JS
2. TypeScript
3. Интерпретатор командной строки. В параметрах обязательно должны быть логин, пароль, действие и аргументы этого дейтсвия в любом формате.
4. При запуске из командной строки с параметрами нужно выполнять подключение к Серверу и выполнять REST API операции.
5. Данные, полученные от Сервера выводить в консоль.

Use it like a cURL

SingUp

```
npm run start:client -- --request POST 'http://127.0.0.1:5000/users/' \
--header 'Content-Type: application/json' \
--data '{
    "login": "ulogin",
    "password": "upassword"
}'
```

SingIn

```
npm run start:client -- --request POST 'http://127.0.0.1:5000/singIn/' \
--header 'Content-Type: application/json' \
--data '{
    "login": "ulogin",
    "password": "upassword"
}'
```

Get `accessToken` from response

GET Car

```
npm run start:client -X GET\
 'http://127.0.0.1:5000/cars/?brand=string1&price=1.1' --header 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYzYzcwMWE3ZGM5MTA0NWI2MTRlZmQwYSIsInR5cGUiOiJ1c2VyIiwiaWF0IjoxNjczOTg2NjI2LCJleHAiOjE2NzM5OTM4MjZ9.Pdcq-OWbC40dxB0ZR2XLkcDS9yZBcnf3bKRF4Gb4mJM'
```

POST Car

```
npm run start:client -- --request POST 'http://127.0.0.1:5000/cars/' --header 'Content-Type: application/json' --data '{
    "brand": "string1",
    "name": "string1",
    "year": "string1",
    "price": 1.1
}' --header 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYzYzcwMWE3ZGM5MTA0NWI2MTRlZmQwYSIsInR5cGUiOiJ1c2VyIiwiaWF0IjoxNjczOTg2NjI2LCJleHAiOjE2NzM5OTM4MjZ9.Pdcq-OWbC40dxB0ZR2XLkcDS9yZBcnf3bKRF4Gb4mJM'
```

DELETE

```
npm run start:client -- --request DELETE 'http://127.0.0.1:5000/cars/63c7134ce91fb9aa751f776d' --header 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYzYzcwMWE3ZGM5MTA0NWI2MTRlZmQwYSIsInR5cGUiOiJ1c2VyIiwiaWF0IjoxNjczOTg2NjI2LCJleHAiOjE2NzM5OTM4MjZ9.Pdcq-OWbC40dxB0ZR2XLkcDS9yZBcnf3bKRF4Gb4mJM'
```
