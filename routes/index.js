var express = require('express');
var router = express.Router();
var bluebird = require('bluebird');
var db = require('./basedatos').db;


/* GET home page. */
router.get('/', function(req, res, next)
{
  res.render('index', { title: 'Appetyte backoffice' });
});

router.post('/login', function(req, res, next)
{
  var username = req.body.txtUsuario;
  var password = req.body.txtPassword;
  var query = "select * from usertable where type = 'administrator' and " +
                  "username = '" + username + "' and password = '" + password +"'";
  db.any(query)
  .then(result =>
    {
      if(result.length < 1)
      {
        console.log('Result:', 'vacio', ' ', query);
        res.redirect('/');
      }
      else
      {
        console.log('Result:', result[0]);
        res.redirect('/administrador');
      }
    }
  )
  .catch(err =>
    {
      console.log('Error: ', err);
      res.redirect('/');
    }
  );
});

module.exports = router;
