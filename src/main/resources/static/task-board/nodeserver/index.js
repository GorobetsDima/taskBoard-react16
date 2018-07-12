// import path from 'path';
// import express from '../task-board/node_modules/express';
// import exphbs from '../task-board/node_modules/express-handlebars';
const path = require('path');
const express = require('../node_modules/express');
const exphbs = require('../node_modules/express-handlebars');
const axios = require('../node_modules/axios');
const bodyParser = require("../node_modules/body-parser");


const app = express();

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

app.engine('.hbs', exphbs({
    defaultLayout: 'main',
    extname: '.hbs',
    layoutsDir: path.join(__dirname, 'views/layouts')
}));
app.set('view engine', '.hbs');
app.set('views', path.join(__dirname, 'views'));
app.listen(3000);

app.get('/', (request, response) => {
    response.render('home', {
        name: 'John'
    })
});

app.get('/api/lanes', (req, res) => {
    const backReq = axios.get('http://localhost:8080/lanes');
    backReq.then(resp => {
            res.send({lanes: resp.data});
        },
        error => console.log(error));
});

app.post('/api/saveCard', (req, res) => {
    console.log("start saveCard");
    console.log(req.body);
    const backReq = axios.post('http://localhost:8080/saveCard', {
        'card': req.body.card,
        'laneId': req.body.laneId
    });
    backReq.then(resp => {
            // res.send({express: resp.data});
            console.log(resp);
        },
        error => console.log(error));
    console.log("end saveCard");
});

