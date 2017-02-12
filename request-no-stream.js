const request = require('request');

module.exports = (options) => (req, res, next) => {
    const bunchConfig = req.query;
    let counter = 0;

    res.write('{');
    Object.keys(bunchConfig).forEach((key, i, arr) => {
        request.get(`http://localhost:3000${bunchConfig[key]}`)
            .on('data', (response) => {
                res.write(`"${key}":`);
                res.write(response);

                counter++;

                if (counter === arr.length) {
                    res.write('}');
                    res.end();
                    return;
                }

                res.write(',')
            })
            .on('error', (err) => {
                res.status(500).send(err);
            });
    });
};
