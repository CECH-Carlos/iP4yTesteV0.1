const express = require("express");
const registro_rotas = express.Router();
const Usuario = require("../models/usuario-model");
const passport = require("passport");
var bcrypy = require("bcryptjs");

registro_rotas.get("/registros", (req, res) => {
  res.render("home/registros");
});

registro_rotas.get("/listaRegistros", async (req, res) => {
  Usuario.findAll({order: [['id', 'ASC']]}).then(function(registros){
      res.render('registros', {registros: registros});
  })
});

registro_rotas.post("/add", (req, res) => {
  var cpf = req.body.cpf;
  var nome = req.body.name;
  var sobrenome = req.body.sobrenome;
  var dataNascimento = req.body.dataNascimento;
  var email = req.body.email;
  var genero = req.body.genero;
  console.log(res, cpf, nome, sobrenome, dataNascimento, email, genero);
  saveUser(res, cpf, nome, sobrenome, dataNascimento, email, genero);
  //res.redirect("/registros");
});

function saveUser(
  res,
  cpfuse,
  nomeuse,
  sobrenomeuse,
  dataNascimentouse,
  emailuse,
  generouse
) {
  var erros = [];

  if (!cpfuse || typeof cpfuse == undefined || cpfuse == null) {
    erros.push({ texto: "cpf inválido" });
  }
  if (cpfuse.length < 11) {
    erros.push({ texto: "cpf do user muito pequeno" });
  }
  if (!nomeuse || typeof nomeuse == undefined || nomeuse == null) {
    erros.push({ texto: "Nome inválido" });
  }
  if (nomeuse.length < 2) {
    erros.push({ texto: "Nome muito pequeno" });
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
  if (!emailuse || typeof emailuse == undefined || emailuse == null) {
    erros.push({ texto: "email inválido" });
  }
  if (erros.length > 0) {
    res.render("home/add_registro", { erros: erros });
  } else {
    Usuario.findOne({
      where: { email: emailuse, cpf: cpfuse},
    })
      .then((usuario) => {
        if (usuario) {
          console.log(usuario.email);
          res.render("home/add_registro", {
            error_msg: "Já existe registro com esse email!",
          });
        } else {
          bcrypy.genSalt(10, (erro, salt) => {
            bcrypy.hash(cpfuse, salt, (erro, hash) => {
              if (erro) {
                res.render("home/", {
                  error_msg: "Houve um erro durante o salvamento do registro!",
                });
              }

              cpfuse = hash;

              Usuario.create({
                cpf: cpfuse,
                nome: nomeuse,
                sobrenome: sobrenomeuse,
                dataNascimento: dataNascimentouse,
                email: emailuse,
                genero: generouse,
              })
                .then(() => {
                  res.render("home/registros", {
                    success_msg: "Registro adicionado com sucesso!",
                  });
                })
                .catch((erro) => {
                  console.log("erro: " + erro);
                  res.render("home/add_registro");
                });
            });
          });
        }
      })
      .catch((err) => {
        res.render("home/add_registro", {
          error_msg: "erro interno na hora de cadastrar o registro!" + err,
        });
      });
  }
}

registro_rotas.post("/listaRegistros", (req, res, next) => {
  passport.authenticate("local", {
    successRedirect: "/home/lista",
    failureRedirect: "/home/login",
    failureFlash: true,
  })(req, res, next);
});

module.exports = registro_rotas;
