const db = require('./db')


const Usuaro = db.sequelize.define('registros', {
    cpf: {
        type: db.Sequelize.STRING
    },
    nome: {
        type: db.Sequelize.STRING
    },
    sobrenome: {
        type: db.Sequelize.STRING
    },
    dataNascimento: {
        type: db.Sequelize.STRING
    },
    email: {
        type: db.Sequelize.STRING
    },
    genero: {
        type: db.Sequelize.STRING
    }
})

//Usuaro.sync({ force: true })

module.exports = Usuaro