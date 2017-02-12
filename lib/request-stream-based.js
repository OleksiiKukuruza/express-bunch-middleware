const request = require('request');
const PassThrough = require('stream').PassThrough;

module.exports = (req, res, next) => {
    const query = req.query;
    const protocol = req.protocol;
    const host = req.get('host');
    const jsonConfig = Object.keys(query).reduce((result, key) => {
        result[key] = request.get(`${protocol}://${host}${query[key]}`);
        return result;
    }, {});

    res.set('Content-Type', 'application/json');

    getJsonStream(jsonConfig)
        .pipe(res);

    function getJsonStream(props) {
        const result = new PassThrough();
        let counter = 0;
        let json = '';

        Object.keys(props).forEach((key, i, arr) => {
            let jsonProp = `"${key}":`;

            props[key].on('data', dataHandler);

            props[key].once('end', () => {
                counter++;
                props[key].removeListener('data', dataHandler);
                json += jsonProp;

                if (counter !== arr.length) {
                    json += ',';
                } else {
                    result.end(`{${json}}`);
                }
            });

            function dataHandler(data) {
                jsonProp += data;
            }
        });

        return result;
    }
};
