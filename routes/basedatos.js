var bluebird = require('bluebird');
var pgp = require('pg-promise')({
    promiseLib: bluebird
});
const connectionUrl = 'postgres://rcygnhpuisrxld:9b08ad521466ea78f8697fe956e534d9a300d52f0d164f67f4eb0fe80833698f@ec2-54-225-95-183.compute-1.amazonaws.com:5432/d1rqbmoplu7o3p?ssl=true&sslfactory=org.postgresql.ssl.NonValidatingFactory';
var db = pgp(connectionUrl);

module.exports.db = db;