const User = require("../models/User");
const bcrypt = require("bcryptjs");

exports.GetLogin = (req, res, next) => {

  res.render("auth/login", {
    pageTitle: "Login",
    loginActive: true,
  });
};

exports.PostLogin = (req, res, next) => {
  const email = req.body.email;
  const password = req.body.password;

  User.findOne({where: {email: email}})
    .then((user)=>{
      if(!user){
        req.flash("errors","El email es invalido");
        return res.redirect("/login"); // si el usuario no existe
      }

      bcrypt.compare(password, user.password)// compara la contraseña ingresada con la que esta incriptada en la bd
        .then((result)=>{

          if(result){
            req.session.isLoggedIn = true; // si la contraseña es igual, se guardas la seccion 
            req.session.user = user;
            return req.session.save(err=>{
              console.log(err);
              res.redirect("/");
            })
          }
          req.flash("errors","La contraseña es invalida");
          res.redirect("/login")

        })
        .catch((err)=>{
          console.log(err);
          req.flash("errors","Ha ocurrido un error");
          return res.redirect("/login");
        })
    })
    .catch((err)=>{
      console.log(err);
      return res.redirect("/login");
    })

  
};

exports.PostLogout = (req, res, next) => {
  
  req.session.destroy(err=>{
    console.log(err);
    res.redirect("/");
  })
  
};

exports.GetSignUp = (req, res, next) => {

  res.render("auth/signup", {
    pageTitle: "Login",
    signupActive: true,
  });
};

exports.PostSignUp = (req, res, next) => {
  const name = req.body.name;
  const email = req.body.email;
  const password = req.body.password;
  const confirmPassword = req.body.confirmPassword;

  if(password !== confirmPassword){
    req.flash("errors","Las contraseñas no coinciden");
    return res.redirect("/signup");
  }

  User.findOne({where: {email: email}})
  .then(user=>{
    if(user){
      req.flash("errors","No puedes crear usuarios con el mismo correo");
      return res.redirect("/signup"); // si el usuario existe que lo redireccione
    }

    bcrypt
    .hash(password, 12) // encriptando la contraseña, con 12 de complegidad
    .then((hashedPassword)=>{
      console.log(hashedPassword)
      User.create({name: name, email: email, password: hashedPassword})
      .then((result)=>{
        res.redirect("/login");
      })
      .catch((err)=>{
        console.log(err);
        return res.redirect("/signup");
      })

    })
    .catch((err)=>{
      console.log(err);
      return res.redirect("/signup");
    })


  }).catch(err=>{
    console.log(err);
    return res.redirect("/signup");
  })

};
