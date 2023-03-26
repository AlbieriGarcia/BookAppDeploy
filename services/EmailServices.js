const nodemailer = require("nodemailer");

const trasporter = nodemailer.createTransport({
    service: "gmail",
    secure: false,
    port: 587, //es el puerto mas usado para gmail
    auth:{
        user: "fifineps4@gmail.com",
        pass: "zoblzkkofolcsqhj", //contraseña de aplicación generada por google
    },
    tls:{
        rejectUnauthorized: false   
    }
});

module.exports = trasporter;