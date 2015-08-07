/*

This seed file is only a placeholder. It should be expanded and altered
to fit the development of your application.

It uses the same file the server uses to establish
the database connection:
--- server/db/index.js

The name of the database used is set in your environment files:
--- server/env/*

This seed file has a safety check to see if you already have users
in the database. If you are developing multiple applications with the
fsg scaffolding, keep in mind that fsg always uses the same database
name in the environment files.

*/

var mongoose = require('mongoose');
var Promise = require('bluebird');
var chalk = require('chalk');
var connectToDb = require('./server/db');
var User = Promise.promisifyAll(mongoose.model('User'));
var Address = Promise.promisifyAll(mongoose.model('Address'));
var Route = Promise.promisifyAll(mongoose.model('Route'));

var users = [
    new User({email: 'annie@annie.com', password: 'annie'})
]

var addresses = [
    new Address({street: '800 6th Avenue', city: 'New York', state: 'NY', zip: '10001', isFavorite: false}),
    new Address({street: '5 Hanover Square', city: 'New York', state: 'NY', zip: '10004', isFavorite: true}),
    new Address({street: '251 Elizabeth St', city: 'New York', state: 'NY', zip: '10012', isFavorite: true }),];

var routes = [ //add userIds
    new Route({start_address: addresses[1], end_address: addresses[2]})
];

// connectToDb.then(function () {
//     Address.findAsync({}).then(function (addresses) {
//         if (addresses.length === 0) {
//             return seedUsers();
//         } else {
//             console.log(chalk.magenta('Seems to already be user data, exiting!'));
//             process.kill(0);
//         }
//     }).then(function () {
//         console.log(chalk.green('Seed successful!'));
//         process.kill(0);
//     }).catch(function (err) {
//         console.error(err);
//         process.kill(1);
//     });
// });

var bluebird = require('bluebird');
var mongoose = require('mongoose');



var wipeDB = function () {

    var models = [Route, Address, User];

    models.forEach(function (model) {
        model.find({}).remove(function () {});
    });

    return bluebird.resolve();

};

var seed = function () {

    Address.create(addresses, function (err) {
        if (err) {
            console.error(err);
        }
        Route.create(routes, function (err) {
            if (err) {
                console.error(err);
            }
            User.create(users, function (err) {
                if (err) {
                    console.error(err);
                }
                console.log('Database seeded!');
                process.kill(0);
            })
        })
    });

};

mongoose.connection.once('open', function () {
    wipeDB().then(seed);
});
