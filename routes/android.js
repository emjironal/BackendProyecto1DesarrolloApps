var express = require('express');
var router = express.Router();
var db = require('./basedatos').db;

//Login
/**
 * login
 * Recibe: {username: <valor string>, password: <valor string>}
 * Devuelve: {result: <valor boolean>}
 */
router.post("/login", function(req, res, next)
{
	console.log("Solicitud de login", req.body);
	db.query("select * from usertable where username = '"+req.body.username+"' and password = '"+req.body.password+"' and type = 'normal'")
	.then(result=>
	{
		if(result.length < 1)
		{
			res.send({result: false});
		}
		else
		{
			res.send({result: true});
		}
	})
	.catch(err=>
	{
		console.log("Error: ", err);
		res.send("error");
	});
});

//Restaurantes
/**
 * getRestaurante
 * Recibe: {idrestaurant: <valor int>}
 * Devuelve: {idrestaurant: <valor int>, name: <valor string>, latitudepos: <valor double>, longitudepos: <valor double>, realscore: <valor double>, foodtype: <valor string>, open: <valor string>, close: <valor string>, price: <valor string>, codigodistrito: <valor int>}
 */
router.post("/getRestaurante", function(req, res, next)
{
	console.log(req.body);
	var query = "select r.idrestaurant, r.name, r.latitudepos, r.longitudepos, s.realscore, r.foodtype, r.open, r.close, r.price, r.codigodistrito " +
	"from Restaurant r inner join Score s on (r.idrestaurant = s.idrestaurant) " +
	"where r.idrestaurant = '" + req.body.idrestaurant + "' " +
    "order by r.idrestaurant";
	db.query(query)
    .then(restaurante=>
    {
    	res.send(restaurante);
    })
    .catch(err=>
    {
    	console.log("Error: ", err);
    	res.send("error");
    });
});

/**
 * getRestaurantes
 * Recibe: {idrestaurant: <valor int>}
 * Devuelve: [{idrestaurant: <valor int>, name: <valor string>, latitudepos: <valor double>, longitudepos: <valor double>, realscore: <valor double>, foodtype: <valor string>, open: <valor string>, close: <valor string>, price: <valor string>, codigodistrito: <valor int>}]
 */
router.get("/getRestaurantes", function(req, res, next)
{
	var query = "select r.idrestaurant, r.name, r.latitudepos, r.longitudepos, s.realscore, r.foodtype, r.open, r.close, r.price, r.codigodistrito " +
	"from Restaurant r inner join Score s on (r.idrestaurant = s.idrestaurant) " +
    "order by r.idrestaurant";
	db.query(query)
    .then(restaurantes=>
    {
    	res.send(restaurantes);
    })
    .catch(err=>
    {
    	console.log("Error: ", err);
    	res.send("error");
    });
});

/**
 * eliminarRestaurante
 * Recibe: {idrestaurant: <valor int>}
 * Devuelve: {result: <valor boolean>}
 */
router.post("/eliminarRestaurante", function(req, res, next)
{
	db.query("delete from Restaurant where idrestaurant = " + req.body.idrestaurant)
    .then(()=>
    {
        res.send({result: true});
    })
    .catch(err=>
    {
        console.log("Error: ", err);
        res.send({result: false});
    });
});

/**
 * modificarRestaurante
 * Recibe: {idrestaurant: <valor int>, name: <valor string>, latitudepos: <valor double>, longitudepos: <valor double>, foodtype: <valor string>, open: <valor string formato hh:mm:ss>, close: <valor string formato hh:mm:ss>, price: <valor string>, codigodistrito: <valor int>}
 * Devuelve: {result: <valor boolean>}
 */
router.post("/modificarRestaurante", function(req, res, next)
{
	var idrestaurant = req.body.idrestaurant;
	var name = req.body.name;
    var latitudepos = req.body.latitudepos;
    var longitudepos = req.body.longitudepos;
    var foodtype = req.body.foodtype;
    var open = req.body.open;
    var close = req.body.close;
    var price = req.body.price;
    var codigodistrito = req.body.distrito;
    var query = "update Restaurant set name = '" + name + "', latitudepos = " + latitudepos + ", " +
        "longitudepos = " + longitudepos + ", foodtype = '" + foodtype + "', open = '" + open + "', close = '" + close + "', " +
        "price = '" + price + "', codigodistrito = '" + codigodistrito + "' " +
        "where idrestaurant = " + idrestaurant;
    db.query(query)
    .then(()=>
    {
        res.send({result: true});
    })
    .catch(err=>
    {
        console.log("Error: ", err);
        res.send({result: false});
    });
});

/**
 * insertarRestaurante
 * Recibe: {name: <valor string>, latitudepos: <valor double>, longitudepos: <valor double>, foodtype: <valor string>, open: <valor string formato hh:mm:ss>, close: <valor string formato hh:mm:ss>, price: <valor string>, codigodistrito: <valor int>}
 * Devuelve: {result: <valor boolean>}
 */
router.post("/insertarRestaurante", function(req, res, next)
{
	var name = req.body.name;
    var latitudepos = req.body.latitudepos;
    var longitudepos = req.body.longitudepos;
    var foodtype = req.body.foodtype;
    var open = req.body.open;
    var close = req.body.close;
    var price = req.body.price;
    var codigodistrito = req.body.distrito;
    var query = "select insertarRestaurante('" + name + "'," + latitudepos + "," + longitudepos + ",'" + foodtype +
    "','" + open + ":00','" + close + ":00','" + price + "'," + codigodistrito + ")";
    db.query(query)
    .then(()=>
    {
        res.send({result: true});
    })
    .catch(err=>
    {
        console.log("Error: ", err);
        res.send({result: false});
    });
});

//Usuarios
/**
 * insertarUsuario
 */

module.exports = router;