// load up our shiny new route for users
const productRoutes = require('./products');

const appRouter = (app, fs) => {
    // we've added in a default route here that handles empty routes
    // at the base API url
    app.get('/', (req, res) => {
        res.send('welcome to the development api-server');
    });

    app.all('/*', function(req, res, next) {
        res.header("Access-Control-Allow-Origin", "*");
        res.header("Access-Control-Allow-Headers", "X-Requested-With");
        next();
    });

    // run our user route module here to complete the wire up
    productRoutes(app, fs);
};

// this line is unchanged
module.exports = appRouter;