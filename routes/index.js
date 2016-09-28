var express = require('express');
var router = express.Router();
var cassandra = require('cassandra-driver');

var db = new cassandra.Client({
    contactPoints: ['localhost']
});

db.connect(function(err, result) {
    console.log('cassandra connected');
});

var getAllNamesQuery = 'SELECT * FROM ceandb.names';

/* GET home page. */
router.get('/', function (req, res, next) {
    db.execute(getAllNamesQuery, [], function (err, result) {
        if (err) {
            res.status(404, send({
                title: 'db error!'
            }));
        } else {
            res.render('index', {
                title: 'Express Cassandra Home',
                names: result.rows
            });
        }
    });
    console.log('tttest')
});

module.exports = router;
