# express-bunch-middleware

Express middleware to combine multiple API requests into one.

[![Build Status](https://travis-ci.org/OleksiiKukuruza/express-bunch-middleware.svg?branch=master)](https://travis-ci.org/OleksiiKukuruza/express-bunch-middleware)
[![Coverage Status](https://coveralls.io/repos/github/OleksiiKukuruza/express-bunch-middleware/badge.svg?branch=master)](https://coveralls.io/github/OleksiiKukuruza/express-bunch-middleware?branch=master)

## Usage

```javascript
const express = require('express');
const bunch = require('express-bunch-middleware');
const app = express();

app.use('/resources', bunch);

app.get('/api/users', (req, res) => {
    res.json([{name: 'John', surname: 'Doe'}]);
});

app.get('/api/countries/:id', (req, res) => {
    setTimeout(() => {
        res.json({name: 'United States of America', countryCode: 'USA'});
    }, 30)
});

app.listen(3000);
```

## Description

API call like:

GET /resources?users=/api/users&country=/api/countries/23

will responds with:

```json
{
    "users": [{
        "name": "John",
        "surname": "Doe"
    }],
    "countries": [{
        "name": "United States of America",
        "countryCode": "USA"
    }]
}
```

## License

MIT