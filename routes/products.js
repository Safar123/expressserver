    // variables

    // READ
    const userRoutes = (app, fs) => {
        //...unchanged ^^^
        const dataPath = './data/product.json';

        // refactored helper methods
        const readFile = (
            callback,
            returnJson = false,
            filePath = dataPath,
            encoding = 'utf8'
        ) => {
            fs.readFile(filePath, encoding, (err, data) => {
                if (err) {
                    throw err;
                }

                callback(returnJson ? JSON.parse(data) : data);
            });
        };

        const writeFile = (
            fileData,
            callback,
            filePath = dataPath,
            encoding = 'utf8'
        ) => {
            fs.writeFile(filePath, fileData, encoding, (err) => {
                if (err) {
                    throw err;
                }

                callback();
            });
        };

        // READ all data api
        // Notice how we can make this 'read' operation much more simple now.
        app.get('/products', (req, res) => {
            readFile((data) => {
                res.send(data);
            }, true);
        });


        // CREATE new products api
        app.post('/products', (req, res) => {
            readFile((data) => {
                // Note: this needs to be more robust for production use.
                // e.g. use a UUID or some kind of GUID for a unique ID value.
                const newUserId = Date.now().toString();
                // add the new user
                data[newUserId] = req.body;
                writeFile(JSON.stringify(data, null, 2), () => {
                    res.status(200).send('New Product added');
                });
            }, true);
        });


        // DELETE all api
        app.get('/products/:id', (req, res) => {
            readFile((data) => {
                // add the new user
                console.log(req.params.id);
                const userId = req.params['id'];
                Object.keys(data).forEach(key =>
                {
                    delete data[key];
                });
                writeFile(JSON.stringify(data, null, 2), () => {
                    res.status(200).send(`Products id:${userId} removed`);
                });
            }, true);
        });
    };
    module.exports = userRoutes;