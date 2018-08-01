const express = require('express');
const grapqlHTTP = require('express-graphql');
const bodyParser = require('body-parser');
const schema = require('./schema/schema');
const mongoose = require('mongoose');
const path = require('path');
const cors = require('cors');
require('dotenv').config();

const app = express();

//allow cross origin requests
app.use(cors());

console.log(__dirname, 'client/build');
app.use(express.static(path.join(__dirname, 'client/build')));

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname + '/client/build/index.html'));
});



const PORT = process.env.PORT || 3001;

app.use('/graphql', bodyParser.json(), grapqlHTTP({
    schema,
    graphiql: true
}));
mongoose.connect(process.env.DB_URL, {useNewUrlParser: true});
mongoose.connection.once('open', () => {
    console.log('connected to database');
})

app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`)
});