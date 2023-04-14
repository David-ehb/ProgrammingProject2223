# Backend

## Installatie

- download https://nodejs.org/en
- open terminal in vscode (ctrl + shift + ù)

```shell
# gaat naar backend directory
cd backend of rechtermuisklik "open in integrated terminal"
# installeer nodemon + packages gedefinieerd in package.json
npm install nodemon
```

## Server opstarten

- open terminal in vscode (ctrl + shift + ù)
- start lokaal server, zorgt ervoor dat je in de backend folder bent

```shell
# gaat naar backend directory
cd backend
# start nodemon en lanceer log_in_backend.js
npm start - node log_in_backend.js
=> console.logs zijn aangebracht om in de terminal te zien of json niet leeg is en SQL commands werken
```

## API testen met vscode

- Installeer de extensie `REST Client`
- Open de `scripts` directory en open de file `test.http`
- Druk op `send request`

# Links
- https://ahmedshaltout.com/node-js/node-js-mysql-database-crud-model-express-tutorial/