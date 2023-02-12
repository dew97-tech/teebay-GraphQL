const Pool = require('pg').Pool;
require('dotenv').config();

// Grabing the Database Credentials
const db_pass = process.env.DB_PASS;
const db_name = process.env.DB_NAME;

// Making the Connection----------
const pool = new Pool({
    user: 'postgres',
    password: `${db_pass}`,
    host: 'localhost',
    port: 5432,
    database: `${db_name}`,
});
//---------------------------------
module.exports = pool;
