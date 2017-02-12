const request = require('request');
const PassThrough = require('stream').PassThrough;

module.exports = (req, res, next) => {
    const bunchConfig = req.query;

    const jsonConfig = Object.keys(bunchConfig).reduce((result, key) => {
        result[key] = request.get(`http://localhost:3000${bunchConfig[key]}`);
        return result;
    }, {});

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
