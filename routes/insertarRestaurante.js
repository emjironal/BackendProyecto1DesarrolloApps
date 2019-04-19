var express = require('express');
var router = express.Router();
var db = require('./basedatos').db;

router.get("/", function(req, res, next)
{
    res.render("insertarRestaurante");
});

router.post("/insertar", function(req, res, next)
{
    var name = req.body.name;
    var latitudepos = req.body.latitudepos;
    var longitudepos = req.body.longitudepos;
    var foodtype = req.body.foodtype;
    var open = req.body.open;
    var close = req.body.close;
    var price = req.body.price;
    var codigodistrito = req.body.distrito;
    var query = "insert into Restaurant (name, latitudepos, longitudepos, foodtype, open, close, price, codigodistrito) " +
    "values('" + name + "'," + latitudepos + "," + longitudepos + ",'" + foodtype +
    "','" + open + ":00','" + close + ":00','" + price + "'," + codigodistrito + ")";
    db.query(query)
    .then(()=>{
        res.redirect("/administrador");
    })
    .catch(err=>{
        console.log("Error: ", err);
        res.redirect("/administrador");
    })
});

module.exports = router;