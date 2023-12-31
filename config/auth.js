const localStrategy = require("passport-local").Strategy
const bcrypt = require("bcryptjs")


// Model de Usuário
const Usuario = require("../models/usuario-model")

module.exports = function(passport) {

    passport.use(new localStrategy({ usernameField: 'email', cpfField: 'cpf' }, (email, cpf, done) => {
        Usuario.findOne({ where: { email: email } }).then((usuario) => {
            console.log('usuari => ' + usuario)
            if (!usuario) {
                return done(null, false, { message: 'Esta conta não existe' })
            }

            bcrypt.compare(cpf, usuario.password, (erro, batem) => {
                console.log('comparando CPF com user!')
                if (batem) {
                    console.log('comparação correta!')
                    return done(null, usuario)
                } else {
                    return done(null, false, { message: 'CPF incorreto' })
                }
            })
        })
    }))

    passport.serializeUser((usuario, done) => {
        done(null, usuario.id)
        console.log('id ok!')
    })

    passport.deserializeUser(function(id, done) {

        Usuario.findByPk(id).then(function(user) {

            if (user) {

                done(null, user.get());

            } else {

                done(user.errors, null);

            }

        });

    });
    /*
        passport.deserializeUser((id, done) => {
            console.log('tentando deserialize!')
            Usuario.findByPk(id, (err, usuario) => {
                console.log('develia funcionar!')
                done(err, usuario)
            })

        })
        */
}