const expect = require('chai').expect;
const request = require('supertest');
const requestStreamBased = require('../lib/request-stream-based');
const express = require('express');
const app = express();

app.use('/resources', requestStreamBased);

app.get('/api/countries', (req, res) => {
    res.status(200).json([{countryCode: 'USA'}, {countryCode: 'UK'}]);
});


app.get('/api/customers/:id', (req, res) => {
    setTimeout(() => {
        res.status(200).json({name: 'John', surname: 'Doe', id: req.params.id});
    }, 30)
});

describe('Request stream based', () => {
    it(`should respond with object containing query param keys as keys and values provided by corresponding API's`, (done) => {
        const expected = {
            countries: [{countryCode: 'USA'}, {countryCode: 'UK'}],
            customer: {
                id: '123',
                name: 'John',
                surname: 'Doe'
            }
        };
        request(app)
            .get('/resources?countries=/api/countries&customer=/api/customers/123')
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect((res) => {
                expect(res.body).to.eql(expected);
            })
            .expect(200, done);
    });
});
