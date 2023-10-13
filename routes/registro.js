const express = require("express");
const user_rotas = express.Router();
const passport = require("passport");
var bcrypy = require("bcryptjs");

user_rotas.get("/", (req, res) => {
  res.send("Pagina de registros");
});

user_rotas.get("/index", (req, res) => {
  res.render("user/index");
});

user_rotas.post("/add", (req, res) => {
  var nome = req.body.name;
  var sobrenome = req.body.sobrenome;
  var email = req.body.email;
  var cpf = req.body.cpf;
  var dataNascimento = req.body.dataNascimento;
  var genero = req.body.genero;
  var admin =
    0 /
    console.log(
      res,
      nome,
      email,
      cpf,
      admin,
      sobrenome,
      dataNascimento,
      genero
    );
  saveUser(res, nome, email, cpf, admin, sobrenome, dataNascimento, genero);
});

function saveUser(
  res,
  nomeuse,
  emailuse,
  cpfuse,
  adminuse,
  sobrenomeuse,
  dataNascimentouse,
  generouse
) {
  var erros = [];

  if (!nomeuse || typeof nomeuse == undefined || nomeuse == null) {
    erros.push({ texto: "Nome inválido" });
  }
  if (nomeuse.length < 2) {
    erros.push({ texto: "Nome muito pequeno" });
  }
  if (!emailuse || typeof emailuse == undefined || emailuse == null) {
    erros.push({ texto: "email inválido" });
  }
  if (!cpfuse || typeof cpfuse == undefined || cpfuse == null) {
    erros.push({ texto: "cpf inválido" });
  }
  if (cpfuse.length < 11) {
    erros.push({ texto: "cpf do user muito pequeno" });
  }
  if (
    !sobrenomeuse ||
    typeof sobrenomeuse == undefined ||
    sobrenomeuse == null
  ) {
    erros.push({ texto: "sobrenome inválido" });
  }
  if (sobrenomeuse.length < 2) {
    erros.push({ texto: "sobrenome do user muito pequeno" });
  }
  if (
    !dataNascimentouse ||
    typeof dataNascimentouse == undefined ||
    dataNascimentouse == null
  ) {
    erros.push({ texto: "data inválida" });
  }
  if (dataNascimentouse.length < 2) {
    erros.push({ texto: "data de nascimento do user muito pequena" });
  }
  if (erros.length > 0) {
    res.render("home/add_usuario", { erros: erros });
  } else {
    Usuario.findOne({
      where: { email: emailuse },
    })
      .then((usuario) => {
        if (usuario) {
          console.log(usuario.email);
          res.render("home/add_usuario", {
            error_msg: "Já existe usuario com esse email!",
          });
        } else {
          bcrypy.genSalt(10, (erro, salt) => {
            bcrypy.hash(cpfuse, salt, (erro, hash) => {
              if (erro) {
                res.render("home/", {
                  error_msg: "Houve um erro durante o salvamento do usuario!",
                });
              }

              passworduse = hash;

              Usuario.create({
                cpf: cpfuse,
                nome: nomeuse,
                sobrenome: sobrenomeuse,
                dataNascimento: dataNascimentouse,
                email: emailuse,
                genero: generouse,
                admin: adminuse,
              })
                .then(() => {
                  res.render("home/loginPage", {
                    success_msg: "Usuario adicionado com sucesso!",
                  });
                })
                .catch((erro) => {
                  console.log("erro: " + erro);
                  res.render("home/addusuario");
                });
            });
          });
        }
      })
      .catch((err) => {
        res.render("home/add_usuario", {
          error_msg: "erro interno na hora de cadastra user!" + err,
        });
      });
  }
}

user_rotas.post("/loginPage", (req, res, next) => {
  passport.authenticate("local", {
    successRedirect: "/home",
    failureRedirect: "/home/login",
    failureFlash: true,
  })(req, res, next);
});

user_rotas.get("/logout", (req, res) => {
  req.logout(req.user, (err) => {
    if (err) return next(err);
    res.redirect("/home");
  });
});

module.exports = user_rotas;
