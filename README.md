GraphQl Project with Apollo Client, React Bootstrap 5, Node js and Postgres SQL
===============================================================================

This project is built with GraphQl as the primary technology stack. The Frontend uses Apollo Client and React Bootstrap 5. The backend is built with Node js and Graphql. In addition, inMemoryCache is used to store session data. The database used for this project is Postgres SQL.

Currently, the project has implemented the following functionalities:

*   Fetch All Products
*   Login System
*   Delete Product

More functionalities are in progress and will be added soon.

To run the project, clone the repository and follow the steps below:

1.  Run `npm install` in both the client and server directories to install dependencies.
2.  Create a `.env` file in the server directory with the following variables:

makefile

```makefile
PORT=<port_number>
DB_URL=<postgres_database_url>
SECRET=<secret_key>
```

3.  Run `npm start` in both the client and server directories to start the project.

Feel free to contribute to the project by submitting a pull request.
