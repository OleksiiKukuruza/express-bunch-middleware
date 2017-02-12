const express = require('express');
const bunch = require('./index');
const app = express();

app.use('/resources', bunch);

app.get('/api/users', (req, res) => {
    setTimeout(() => {
        res.json([{name: 'John', surname: 'Doe'}]);
    }, 20)
});

app.get('/api/users/:id', (req, res) => {
    res.json({name: 'John', surname: 'Doe'});
});

app.get('/api/customers', (req, res) => {
    res.json([{name: 'John', surname: 'Doe'}]);
});

app.get('/api/customers/:id', (req, res) => {
    setTimeout(() => {
        res.json({name: 'John', surname: 'Doe'});
    }, 30)
});

app.get('/api/countries', (req, res) => {
    res.status(500).json({code: 1, error: 'Something goes wrong'});
});

app.listen(3000);
