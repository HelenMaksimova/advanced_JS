const express = require('express');
const cors = require('cors');
const { addItem, deleteItem } = require('./project_functions');
const { BASKET_GOODS_PATH } = require('./settings');

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.static('./static'));

app.patch('/api', (request, response) => {
    addItem(BASKET_GOODS_PATH, request.body).then((items) => {
        response.setHeader('Content-type', 'application/json')
        response.send(items)
    });
});

app.delete('/api', (request, response) => {
    deleteItem(BASKET_GOODS_PATH, request.body.id).then((items) => {
        response.setHeader('Content-type', 'application/json')
        response.send(items)
    });
});

app.listen('8000', () => {
    console.log('server is run!');
})
