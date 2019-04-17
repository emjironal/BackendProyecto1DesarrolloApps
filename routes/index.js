var express = require('express');
var router = express.Router();
var bluebird = require('bluebird');
var pgp = require('pg-promise')({
    promiseLib: bluebird
});
const connectionUrl = 'postgres://rcygnhpuisrxld:9b08ad521466ea78f8697fe956e534d9a300d52f0d164f67f4eb0fe80833698f@ec2-54-225-95-183.compute-1.amazonaws.com:5432/d1rqbmoplu7o3p?ssl=true&sslfactory=org.postgresql.ssl.NonValidatingFactory';
var db = pgp(connectionUrl);


/* GET home page. */
router.get('/', function(req, res, next)
{
  res.render('index', { title: 'Appetyte backoffice' });
});

router.post('/login', function(req, res, next)
{
  res.redirect('/');
  var username = req.body.txtUsuario;
  var password = req.body.txtPassword;
  db.any('select * from usertable where type = \'administrador\' and ' +
    'username = \'' + username + '\' and password = \'' + password +'\'')
  .then(result =>
    {
      if(result.length < 1)
      {
        console.log('Result:', 'vacio');
      }
      else
      {
        console.log('Result:', result[0]);
      }
    }
  )
  .catch(err =>
    {
    console.log('Error: ', err);
    }
  );
});

module.exports = router;
