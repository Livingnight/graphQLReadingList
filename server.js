const express = require('express');
const grapqlHTTP = require('express-graphql');
const schema = require('./schema/schema');
const mongoose = require('mongoose');
const path = require('path');
const cors = require('cors');
require('dotenv').config();

const app = express();

//allow cross origin requests
app.use(cors());


app.use(express.static(path.join(__dirname, 'client/build')));

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname + 'index.html'));
});



const PORT = process.env.PORT || 3001;

app.use('/graphql', grapqlHTTP({
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