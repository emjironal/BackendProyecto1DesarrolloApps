var nodemailer = require('nodemailer');

var email = "appetyte1234@gmail.com";
var password = "021346578";

// email sender function
exports.sendEmail = function(req, res){
// Definimos el transporter
    var transporter = nodemailer.createTransport({
        service: 'Gmail',
        auth: {
            user: email,
            pass: password
        }
    });
    // Definimos el email
    var mailOptions = {
        from: 'Remitente',
        to: 'emjironal@gmail.com',
        subject: 'Prueba',
        text: 'Contenido del email'
    };
    // Enviamos el email
    transporter.sendMail(mailOptions, function(error, info){
        if (error){
            console.log(error);
            res.send(500, err.message);
        } else {
            console.log("Email sent");
            res.status(200).jsonp(req.body);
        }
    });
};