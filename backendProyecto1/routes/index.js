var express = require('express');
var router = express.Router();
const { Client } = require('pg')
const connectionUrl = 'postgres://rcygnhpuisrxld:9b08ad521466ea78f8697fe956e534d9a300d52f0d164f67f4eb0fe80833698f@ec2-54-225-95-183.compute-1.amazonaws.com:5432/d1rqbmoplu7o3p?ssl=true&sslfactory=org.postgresql.ssl.NonValidatingFactory';
/*const client = new Client(
{
  user: 'rcygnhpuisrxld',
  host: 'ec2-54-225-95-183.compute-1.amazonaws.com',
  database: 'd1rqbmoplu7o3p',
  password: '9b08ad521466ea78f8697fe956e534d9a300d52f0d164f67f4eb0fe80833698f',
  port: 5432
});*/
const client = new Client(
  {
    connectionString: connectionUrl
  }
);

/* GET home page. */
router.get('/', function(req, res, next)
{
  res.render('index', { title: 'Express' });
});

router.post('/prueba', function(req, res, next)
{
  res.render('index', {title: 'Prueba sirve'});
  client.connect();
  client.query('SELECT NOW()', (err, res) => {
    console.log(err, res);
    client.end();
  });
});

module.exports = router;
