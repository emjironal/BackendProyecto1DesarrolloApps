var express = require('express');
var router = express.Router();
var db = require('./basedatos').db;

/* GET home page. */
router.get('/', function(req, res, next)
{
  db.query("select * from Restaurant r " +
    "inner join Score s on (r.idrestaurant = s.idrestaurant) " +
    "order by r.idrestaurant")
    .then(restaurantes=>{
        db.query("select * from Usertable where type ='normal'")
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
        res.render('administrador', {restaurants: [], users: []});
    });
});

router.post("/modificar/:index/:id", function(req, res, next)
{
    var name = req.body.name[req.params.index];
    var latitudepos = req.body.latitudepos[req.params.index];
    var longitudepos = req.body.longitudepos[req.params.index];
    var foodtype = req.body.foodtype[req.params.index];
    var open = req.body.open[req.params.index];
    var close = req.body.close[req.params.index];
    var price = req.body.price[req.params.index];
    var codigodistrito = req.body.distrito[req.params.index];
    db.query("update Restaurant set name = '" + name + "', latitudepos = " + latitudepos + ", " +
        "longitudepos = " + longitudepos + ", foodtype = '" + foodtype + "', open = '" + open + "', close = '" + close + "', " +
        "price = '" + price + "', codigodistrito = '" + codigodistrito + "' " +
        "where idrestaurant = " + req.params.id)
    .then(()=>{
        res.redirect('/administrador');
    })
    .catch(err=>{
        console.log("Error: ", err);
        res.redirect('/administrador');
    })
});
router.post("/eliminar/:id", function(req, res, next)
{
    db.query("select eliminarRestaurante(" + req.params.id + ")")
        .then(()=>{
            res.redirect('/administrador');
        })
        .catch(err=>{
            console.log("Error: ", err);
        });
});

router.post("/insertar", function(req, res, next)
{
    res.redirect("/insertarRestaurante");
});

module.exports = router;