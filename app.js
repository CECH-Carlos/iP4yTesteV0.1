const express = require('express');
//const handlebars = require('express-handlebars')
//const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();
const path = require('path');
const router = express.Router();
//const session = require('express-session');
//const flash = require('connect-flash');
//const passport = require('passport');
//require('./config/auth')(passport)

router.get('/', function (req, res) {
    
    res.sendFile(path.join(__dirname, './views/index.html'));

});

router.get('/sobre', function (req, res) {
    res.sendFile(path.join(__dirname, './views/sobre.html'));
});

app.use('/', router);
app.listen(process.env.PORT || 8080);

console.log('Server rodando!');