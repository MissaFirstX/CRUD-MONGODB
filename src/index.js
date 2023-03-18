const express = require('express');
const mongoose = require('mongoose');
const app = express();
const http = require('http');
const server = http.createServer(app);
require('dotenv').config();
const tareaRoute = require("./routes/tareaRoute");
const port = 3000;


app.get('/', (req, res) => {
    res.sendFile(__dirname + '/public/index.html');
});

//Mongo DB

const MONGODB_URI = process.env.MONGODB_URI;

mongoose.connect(MONGODB_URI, {
    useUnifiedTopology: true,
    useNewUrlParser: true
}).then(db => console.log("Conectado MongoDB")).catch(err => console.log(err));
mongoose.set('strictQuery', true)


//middleware
app.use(express.json());
app.use(express.static(__dirname + '/public'));
app.use('/api', tareaRoute);

server.listen(port, () => {
    console.log('Servidor en :', port);
});