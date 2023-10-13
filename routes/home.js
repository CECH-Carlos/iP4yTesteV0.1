const express = require('express');
const home_rotas = express.Router();
const Usuario = require('../models/usuario-model');

home_rotas.get('/', async(req, res) => {
    await Produto.findAll({
        order: [
            ['id', 'DESC']
        ]
    }).then(() => {

        res.render('home/index')
    })

})

home_rotas.get('/login', async(req, res) => {

    res.render('home/loginPage')


})

home_rotas.get('/addusuario', async(req, res) => {

    res.render('home/add_usuario')


})

home_rotas.get('/buscarUsuario/:id', async(req, res) => {
    var id = req.params.id
    await Usuario.findByPk(id).then((user) => {
        usuario = {
            id: user.id,
            cpf : user.cpf,
            nome: user.nome,
            sobrenome: user.sobrenome,
            email: user.email,
            dataNascimento: user.dataNascimento,
            genero: user.genero
        }
        return res.status(200).json(usuario)

    }).catch((erro) => {
        res.send('erro: ' + erro)
    })
})

module.exports = home_rotas