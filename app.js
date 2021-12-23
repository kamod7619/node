const express = require('express');
const app = express();
const dotenv = require('dotenv').config();
const cors = require("cors");
const bodyParser = require("body-parser");

var corsOptions = {
    origin: "http://localhost:8081"
};

app.use(cors(corsOptions));
// parse requests of content-type - application/json
app.use(bodyParser.json());
// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));
//Database
// var conn = require('./db/config');
const db = require("./Models");
db.sequelize.sync();

//route started
const route = require('./Routes/index');
app.use('/', route);
//end route

//template engine start
var exphbs = require('express-handlebars');
var hbs = exphbs.create({ /* config */ });
// Register `hbs.engine` with the Express app.
app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');
app.set('views', './views');
// app.enable('view cache');
//end engine


//404 handler and pass to error handler
app.use((req, res, next) => {
    next(createError(404, 'Not found'));
});

//Error handler
app.use((err, req, res, next) => {
    res.status(err.status || 500);
    res.send({
        error: {
            status: err.status || 500,
            message: err.message
        }
    });
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log('Server started on port ' + PORT + '...');
});