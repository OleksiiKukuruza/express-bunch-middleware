module.exports = (req, res, next) => {
    const bunchConfig = req.query;
    const promises = [];
    req.app._router.stack.forEach((layer) => {
        const key = Object.keys(bunchConfig).find(key => layer.match(bunchConfig[key]));
        if (layer.route && layer.route.path && key) {
            const promise = new Promise((resolve) => {
                const response = Object.create(res);
                response.json = (body) => {
                    const result = {key, body};
                    resolve(result);
                };

                layer.handle(req, response, next);
            });
            promises.push(promise);
        }
    });

    Promise.all(promises)
        .then((args) => {
            const body = args.reduce((result, prop) => {
                result[prop.key] = prop.body;
                return result;
            }, {});
            res.json(body);
        });
};
