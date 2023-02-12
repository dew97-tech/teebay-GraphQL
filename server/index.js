// --Frameworks/Modules/Libraries
const express = require('express');
const { graphqlHTTP } = require('express-graphql');
const schema = require('./schema/schema');
const cors = require('cors');
const pool = require('./config/database');
require('dotenv').config();

// Initializing the app
const app = express();

// middlewere
app.use(cors());
app.use(express.json());

// Create a PORT
const port = process.env.PORT || 8000;

/*--------------------------
Defining middleware to create a GraphQL API endpoint.
"/graphql" is the endpoint to handle incoming GraphQL requests.
---------------------------*/
app.use(
    '/graphql',
    graphqlHTTP({
        schema,
        graphiql: process.env.NODE_ENV === 'development',
    })
);
// ---------------------------

app.listen(port, console.log(`Server is running on PORT ${port}`));
