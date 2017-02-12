# express-bunch-middleware

Express middleware to combine multiple API requests into one.

## Usage

```javascript
const express = require('express');
const bunch = require('express-bunch-middleware');
const app = express();

app.use('/resource', bunch);

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
    users: [{
        name: 'John',
        surname: 'Doe'
    }],
    countries: [{
        name: 'United States of America',
        countryCode: 'USA'
    }]
}
```

## License

MIT