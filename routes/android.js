var express = require('express');
var router = express.Router();
var db = require('./basedatos').db;

//Login
/**
 * login
 * @param {username: <string>, password: <string>}
 * @returns {iduser: <int>, username: <string>, password: <string>, email: <string>}
 */
router.post("/login", function(req, res, next)
{
	console.log("Solicitud de login", req.body);
	db.query("select * from usertable where username = '"+req.body.username+"' and password = '"+req.body.password+"' and type = 'normal'")
	.then(user=>
	{
		if(user.length < 1)
		{
			res.send(user);
		}
		else
		{
			res.send(user);
		}
	})
	.catch(err=>
	{
		console.log("Error: ", err);
		res.send("error");
	});
});

//CRUD Restaurantes
/**
 * getRestaurante
 * @param {idrestaurant: <int>}
 * @returns {idrestaurant: <int>, name: <string>, latitudepos: <double>, longitudepos: <double>, realscore: <double>, foodtype: <string>, open: <string>, close: <string>, price: <string>, codigodistrito: <int>}
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
 * @param {idrestaurant: <int>}
 * @returns {idrestaurant: <int>, name: <string>, latitudepos: <double>, longitudepos: <double>, realscore: <double>, foodtype: <string>, open: <string>, close: <string>, price: <string>, codigodistrito: <int>}
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
 * @param {idrestaurant: <int>}
 * @returns {result: <boolean>}
 */
router.post("/eliminarRestaurante", function(req, res, next)
{
	db.query("select eliminarRestaurante(" + req.body.idrestaurant + ")")
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
 * @param {idrestaurant: <int>, name: <string>, latitudepos: <double>, longitudepos: <double>, foodtype: <string>, open: <string formato hh:mm:ss>, close: <string formato hh:mm:ss>, price: <string>, codigodistrito: <int>}
 * @returns {result: <boolean>}
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
    var codigodistrito = req.body.codigodistrito;
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
        console.log("Error: ", query);
        res.send({result: false});
    });
});

/**
 * insertarRestaurante
 * @param {name: <string>, latitudepos: <double>, longitudepos: <double>, foodtype: <string>, open: <string formato hh:mm:ss>, close: <string formato hh:mm:ss>, price: <string>, codigodistrito: <int>}
 * @returns {result: <boolean>}
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
    var codigodistrito = req.body.codigodistrito;
    var query = "select insertarRestaurante('" + name + "'," + latitudepos + "," + longitudepos + ",'" + foodtype +
    "','" + open + "','" + close + "','" + price + "'," + codigodistrito + ")";
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
 * @param {username: <string>, password: <string>, email: <email>}
 * @returns {result: <boolean>}
 */
router.post("/insertarUsuario", function(req, res, next)
{
	var username = req.body.username;
	var password = req.body.password;
	var email = req.body.email;
	var query = "insert into Usertable (username, password, type, email) values ('" + username + "', '" + password + "', 'normal', '" + email + "')";
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

//Comentarios
/**
 * Crea un comentario a un restaurante
 * @param {"content": <string>, "idrestaurant": <int>, "iduser": <int>}
 * @returns {result: <boolean>}
 */
router.post("/comentar", function(req, res, next)
{
	var content = req.body.content;
	var idrestaurant = req.body.idrestaurant;
	var iduser = req.body.iduser;
	var query = "insert into Comment (content, dateCreated, timeCreated, idRestaurant, idUser) values ('"+content+"', (select now()::date), (select now()::time), '"+idrestaurant+"', '"+iduser+"')";
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
 * Obtiene los comentarios de un restaurante
 * @param {"idrestaurant": <int>}
 * @returns {"username": <string>, "content": <string>, "datecreated": <time>, "timecreated": <time>}
 */
router.post("/getComentarios", function(req, res, next)
{
	var idrestaurant = req.body.idrestaurant;
	var query = "select username, content, datecreated, timecreated from Comment c inner join Usertable u on (c.iduser = u.iduser) where idrestaurant = '"+idrestaurant+"'";
	db.query(query)
	.then(comments=>
	{
		res.send(comments);
	})
	.catch(err=>
    {
        console.log("Error: ", err);
        res.send("error");
    });
});

//Imagenes
/**
 * Agrega varias imagenes a un restaurante
 * @param {"idrestaurant": <int>, "pictures": [<string>]}
 * @returns {result: <boolean>}
 */
router.post("/agregarImagenes", function(req, res, next)
{
    var idrestaurant = req.body.idrestaurant;
    var pictures = req.body.pictures;
    var query = "insert into Picture (idrestaurant, picture) values "
    for(var i = 0; i < pictures.length; i++)
    {
        if(i == pictures.length - 1)
        {
            query += "("+idrestaurant+", '"+pictures[i]+"')";
        }
        else
        {
            query += "("+idrestaurant+", '"+pictures[i]+"'),";
        }
    }
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
 * Obtiene las imagen de un restaurante
 * @param {"idrestaurant": <int>}
 * @returns {"idrestaurant": <int>, "picture": <string>}
 */
router.post("/getImagenes", function(req, res, next)
{
	var idrestaurant = req.body.idrestaurant;
	var query = "select idrestaurant, picture from Picture where idrestaurant = "+idrestaurant;
    db.query(query)
    .then(pictures=>
	{
		res.send(pictures);
	})
	.catch(err=>
    {
        console.log("Error: ", err);
        res.send("error");
    });
});

//Calificaciones
/**
 * Califica un restaurante
 * @param {"idrestaurant": <int>, "score": <double 0..5>, "iduser": <int>}
 * @returns {"result": <boolean>}
 */
router.post("/calificarResturante", function(req, res, next)
{
    var idrestaurant = req.body.idrestaurant;
    var score = req.body.score;
    var iduser = req.body.iduser;
    var query = "select calificarRestaurante(" + idrestaurant + ", "+ score + ", "+ iduser + ")";
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
 * Obtiene las calificaciones de un restaurante
 * @param {"idrestaurant": <int>, "iduser": <int>}
 * @returns {"score": <double>}
 */
router.post("/getCalificacionUser", function(req, res, next)
{
    var idrestaurant = req.body.idrestaurant;
    var iduser = req.body.iduser;
    var query = "select l.score from Score s inner join LineScore l on (s.idscore = l.idscore) where s.idrestaurant = "+idrestaurant+" and l.iduser = " + iduser;
    db.query(query)
    .then(calificacion=>
	{
		res.send(calificacion);
	})
	.catch(err=>
    {
        console.log("Error: ", err);
        res.send("error");
    });
});

/**
 * Obtiene las calificaciones de un restaurante
 * @param {"idrestaurant": <int>}
 * @returns {"username": <string>, "score": <double>}
 */
router.post("/getCalificacionRestaurante", function(req, res, next)
{
    var idrestaurant = req.body.idrestaurant;
    var iduser = req.body.iduser;
    var query = "select u.username, l.score from Score s inner join LineScore l on (s.idscore = l.idscore) "+
        "inner join Usertable u on(u.iduser = l.iduser) where s.idrestaurant = "+idrestaurant;
    db.query(query)
    .then(calificacion=>
	{
		res.send(calificacion);
	})
	.catch(err=>
    {
        console.log("Error: ", err);
        res.send("error");
    });
});

module.exports = router;