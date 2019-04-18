var express = require('express');
var router = express.Router();
var db = require('./basedatos').db;

/* GET home page. */
router.get('/', function(req, res, next)
{
  db.any("select * from Restaurant")
    .then(result=>{
        console.log("Result: ", result);
        res.render('administrador', {restaurants: result});
    })
    .catch(err=>{
        console.log("Error: ", err);
    });

});

module.exports = router;