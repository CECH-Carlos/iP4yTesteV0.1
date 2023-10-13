const express = require("express");
const home_rotas = express.Router();
const Usuario = require("../models/usuario-model");

home_rotas.get("/", async (req, res) => {
  res.render("home/index");
});

home_rotas.get("/login", async (req, res) => {
  res.render("home/loginPage");
});

home_rotas.get("/cadastro", async (req, res) => {
  res.render("home/add_registro");
});

home_rotas.get("/registros", async (req, res) => {
    await Usuario.findAll({
        order: [
            ['id', 'cpf', 'nome', 'sobrenome', 'dataNascimento',  'email', 'genero']
        ]
    }).then(() => {
        res.render('home/index')
    })
});

home_rotas.get("/buscarRegistro/:id", async (req, res) => {
  var id = req.params.id;
  await Usuario.findByPk(id)
    .then((user) => {
      usuario = {
        id: user.id,
        cpf: user.cpf,
        nome: user.nome,
        sobrenome: user.sobrenome,
        dataNascimento: user.dataNascimento,
        email: user.email,
        genero: user.genero,
      };
      return res.status(200).json(usuario);
    })
    .catch((erro) => {
      res.send("erro: " + erro);
    });
});

module.exports = home_rotas;
