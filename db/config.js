const { Sequelize, Op, Model, DataTypes } = require("sequelize");
// const sequelize = new Sequelize("mysql::memory:");

module.exports = {

    HOST: "localhost",

    USER: "root",

    PASSWORD: "",

    DB: "nodetest",

    dialect: "mysql",

    pool: {

        max: 5,

        min: 0,

        acquire: 30000,

        idle: 10000

    }

};
// Option 3: Passing parameters separately (other dialects)
const sequelize = new Sequelize('nodetest', 'root', '', {
    host: 'localhost',
    dialect: 'mysql'
});


try {
    sequelize.authenticate();
    console.log('Connection has been established successfully.');
} catch (error) {
    console.error('Unable to connect to the database:', error);
}






// var mysql = require('mysql');
// var connection = mysql.createConnection({
//     host: 'localhost',
//     user: 'root',
//     password: '',
//     database: 'nodetest'
// });

// connection.connect(function(err) {
//     if (err) {
//         console.error('error connecting: ' + err.stack);
//         return;
//     }

//     console.log('connected as id ' + connection.threadId);
// });

// connection.query('SELECT 1 + 1 AS solution', function(error, results, fields) {
//     if (error) throw error;
//     console.log('The solution is: ', results[0].solution);
// });

// connection.query('select * from users', function(error, results, fields) {
//     if (error) throw error;
//     console.log('The solution is: ', results);


// });

// connection.end();