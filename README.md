# ToDo App Using Express.JS With TS

## Goal

This application was created to gather the necessary principles of api development in one simple application, including hexagonal architecture, domain-driven development, test-driven development, api documentation and database migration.

### To run the application, run the following commands:

```bash
git clone git@github.com:waidfj/todo-express.git
cd todo-express
npm install
docker compose up -d
npm run migration:run
```

### To view the swagger documentation:

- Open your browser (e.g. chrome, firefox, etc..).
- Input the following link: localhost:8080/api-doc

### To test the application on postman use the following URL:

localhost:8080/
Followed by the path of the needed enpoint endpoint.

### To run written testcases run the following command:

```bash
npm run test
```

### To turn of the application, run the following command:

```bash
docker compose stop
```

### To remove the images perminantely, run the following command:

```bash
docker compose down
```
