// Importing Sample Datas
const pool = require('../config/database');
const {
    GraphQLObjectType,
    GraphQLID,
    GraphQLString,
    GraphQLSchema,
    GraphQLList,
    GraphQLFloat,
    GraphQLNonNull,
    GraphQLInt,
} = require('graphql');

// Schemas ----------------
// Definig Product Type Schema
const ProductType = new GraphQLObjectType({
    name: 'Product',
    fields: () => ({
        prod_id: { type: GraphQLID },
        title: { type: GraphQLString },
        description: { type: GraphQLString },
        price: { type: GraphQLFloat },
        categories: { type: new GraphQLList(GraphQLString) },
        // categories: {
        //     type: new GraphQLList(GraphQLString),
        //     args: {
        //         index: { type: GraphQLList(GraphQLInt) },
        //     },
        //     resolve(parent, args) {
        //         if (args.index) {
        //             return parent.categories.filter((iter, item) =>
        //                 args.index.includes(item)
        //             );
        //         }
        //         return parent.categories;
        //     },
        // },
        image_url: { type: GraphQLString },
        is_available: { type: GraphQLString },
        client_id: { type: GraphQLID },
        client: {
            type: ClientType,
            async resolve(parent, args) {
                try {
                    const res = await pool.query(
                        'SELECT * FROM clients WHERE client_id = $1',
                        [parent.client_id]
                    );
                    return res.rows[0];
                } catch (err) {
                    console.error(err);
                }
            },
        },
    }),
});

// Definig Client Type Schema
const ClientType = new GraphQLObjectType({
    name: 'Client',
    fields: () => ({
        client_id: { type: GraphQLID },
        name: { type: GraphQLString },
        email: { type: GraphQLString },
        phone: { type: GraphQLString },
    }),
});

// EndSchemas ----------------

// Root Sturture Query
const RootQuery = new GraphQLObjectType({
    name: 'RootQueryType',
    fields: {
        // This Qurey Returns all products
        products: {
            type: new GraphQLList(ProductType),
            async resolve(parent, args) {
                try {
                    const client = await pool.connect();
                    const result = await client.query('SELECT * FROM products');
                    client.release();
                    return result.rows;
                } catch (err) {
                    console.error(err);
                }
            },
        },

        // This Qurey Returns all products by client_id {$client_id}
        productsByClientID: {
            type: new GraphQLList(ProductType),
            args: {
                client_id: { type: GraphQLID },
            },
            async resolve(parent, args) {
                try {
                    const client = await pool.connect();
                    const result = await client.query(
                        'SELECT * FROM products WHERE client_id = $1',
                        [args.client_id]
                    );
                    client.release();
                    return result.rows;
                } catch (err) {
                    console.error(err);
                    return [];
                }
            },
        },

        // This Qurey Returns products by {$id}
        product: {
            type: ProductType,
            args: { prod_id: { type: GraphQLID } },
            async resolve(parent, args) {
                try {
                    const client = await pool.connect();
                    const result = await client.query(
                        'SELECT * FROM products WHERE prod_id = $1',
                        [args.prod_id]
                    );
                    client.release();
                    return result.rows[0];
                } catch (err) {
                    console.error(err);
                }
            },
        },
        // This Qurey Returns all Clients
        clients: {
            type: new GraphQLList(ClientType),
            async resolve(parent, args) {
                try {
                    const client = await pool.connect();
                    const result = await client.query('SELECT * FROM clients');
                    client.release();
                    return result.rows;
                } catch (err) {
                    console.error(err);
                }
            },
        },
        // This Qurey Returns clients by {$id}
        client: {
            type: ClientType,
            args: { client_id: { type: GraphQLID } },
            async resolve(parent, args) {
                try {
                    const client = await pool.connect();
                    const result = await client.query(
                        'SELECT * FROM clients WHERE client_id = $1',
                        [args.id]
                    );
                    client.release();
                    return result.rows[0];
                } catch (err) {
                    console.error(err);
                }
            },
        },
    },
});

// Mutations
const Mutation = new GraphQLObjectType({
    name: 'Mutation',
    fields: {
        // Add Client to DB
        addClient: {
            type: ClientType,
            args: {
                name: { type: GraphQLNonNull(GraphQLString) },
                email: { type: GraphQLNonNull(GraphQLString) },
                phone: { type: GraphQLNonNull(GraphQLString) },
            },
            async resolve(parent, args) {
                const query = `
                    INSERT INTO clients (name, email, phone)
                    VALUES ($1, $2, $3)
                    RETURNING *
                `;

                const values = [args.name, args.email, args.phone];

                try {
                    const res = await pool.query(query, values);
                    return res.rows[0];
                } catch (err) {
                    console.log(err);
                }
            },
        },
        // Delete a Client from DB
        deleteClient: {
            type: ClientType,
            args: {
                client_id: { type: GraphQLNonNull(GraphQLID) },
            },
            async resolve(parent, args) {
                try {
                    const { rows } = await pool.query(
                        'DELETE FROM clients WHERE client_id = $1 RETURNING *',
                        [args.client_id]
                    );
                    return rows[0];
                } catch (err) {
                    console.error(err);
                }
            },
        },
        // Add a product in DB
        addProduct: {
            type: ProductType,
            args: {
                title: { type: new GraphQLNonNull(GraphQLString) },
                description: { type: new GraphQLNonNull(GraphQLString) },
                price: { type: new GraphQLNonNull(GraphQLFloat) },
                categories: { type: new GraphQLList(GraphQLString) },
                image_url: { type: new GraphQLNonNull(GraphQLString) },
                is_available: { type: new GraphQLNonNull(GraphQLString) },
                client_id: { type: new GraphQLNonNull(GraphQLID) },
            },
            async resolve(parent, args) {
                try {
                    const query = `
                    INSERT INTO products (title, description, price, categories, image_url, is_available, client_id)
                    VALUES ($1, $2, $3, $4, $5, $6, $7)
                    RETURNING *
                    `;
                    const values = [
                        args.title,
                        args.description,
                        args.price,
                        args.categories,
                        args.image_url,
                        args.is_available,
                        args.client_id,
                    ];

                    const res = await pool.query(query, values);
                    return res.rows[0];
                } catch (err) {
                    console.error(err);
                }
            },
        },
        // Delete a Product
        deleteProduct: {
            type: ProductType,
            args: {
                prod_id: { type: GraphQLNonNull(GraphQLID) },
            },
            async resolve(parent, args) {
                const query = `DELETE FROM products WHERE prod_id = $1 RETURNING *`;
                const values = [args.prod_id];
                try {
                    const res = await pool.query(query, values);
                    return res.rows[0];
                } catch (err) {
                    console.error(err);
                }
            },
        },
        // Update a Product
        updateProduct: {
            type: ProductType,
            args: {
                prod_id: { type: GraphQLNonNull(GraphQLID) },
                title: { type: GraphQLNonNull(GraphQLString) },
                description: { type: GraphQLNonNull(GraphQLString) },
                price: { type: GraphQLNonNull(GraphQLFloat) },
                is_available: { type: GraphQLNonNull(GraphQLString) },
            },
            async resolve(parent, args) {
                const query = `
                    UPDATE products 
                    SET title = $2, description = $3, price = $4, is_available = $5 
                    WHERE prod_id = $1 
                    RETURNING *
                `;
                const values = [
                    args.prod_id,
                    args.title,
                    args.description,
                    args.price,
                    args.is_available,
                ];
                try {
                    const res = await pool.query(query, values);
                    return res.rows[0];
                } catch (err) {
                    console.error(err);
                }
            },
        },
    },
});

// Exporting the RootQuery
module.exports = new GraphQLSchema({
    query: RootQuery,
    mutation: Mutation,
});
