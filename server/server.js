const express = require('express');
const grapqlHTTP = require('express-graphql');
const schema = require('./schema/schema');
const mongoose = require('mongoose');
require('dotenv').config();

const app = express();

const PORT = process.env.PORT || 3000;

const password = process.env.DBPASSWORD;
const user = process.env.DBUSER;
app.use('/graphql', grapqlHTTP({
    schema,
    graphiql: true
}));

mongoose.connect(`mongodb://${user}:${password}@ds259620.mlab.com:59620/gql-livingnight`);
mongoose.connection.once('open', () => {
    console.log('connected to database');
})

app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`)
});