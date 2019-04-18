var express = require('express');
var router = express.Router();
var db = require('./basedatos').db;

/* GET home page. */
router.get('/', function(req, res, next)
{
  db.any("select * from Restaurant")
    .then(restaurantes=>{
        db.any("select * from Usertable")
            .then(usuarios=>{
                res.render('administrador', {restaurants: restaurantes, users: usuarios});
            })
            .catch(err=>{
                console.log("Error: ", err);
                res.render('administrador', {restaurants: restaurantes});
            });
    })
    .catch(err=>{
        console.log("Error: ", err);
        res.render('administrador');
    });

});

module.exports = router;