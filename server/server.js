const express = require('express');
const grapqlHTTP = require('express-graphql');
const schema = require('./schema/schema');
const mongoose = require('mongoose');

const app = express();

const PORT = process.env.PORT || 3000;

app.use('/graphql', grapqlHTTP({
    schema,
    graphiql: true
}));

mongoose.connect('mongodb://livingnight:password41@ds259620.mlab.com:59620/gql-livingnight');
mongoose.connection.once('open', () => {
    console.log('connected to database');
})

app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`)
});