// setting module
const path = require('path');
const express = require('express');
const session = require('express-session');
const hbs = require('hbs');
const bodyparser = require('body-parser');
const app = express();
const ejs = require('ejs');
const moment = require('moment');
const routerSurat = require('./api/routes/appsurat');
const conn = require('./api/db/database');


const redirectLogin = (req, res, next) => {
    if (!req.session.id) {
        res.redirect('/login');
    } else {
        next();
    };
};

//set views file
app.set('views', path.join(__dirname, 'views'));
//set view engine
app.set('view engine', 'ejs');
app.use(bodyparser.json());
app.use(bodyparser.urlencoded({ extended: false }));

//set folder public -> static folder untuk static file
app.use('/assets', express.static(__dirname + '/public'));

//set Express-session
app.use(session({
    secret: 'secret',
    resave: false,
    saveUninitialized: false
}));

//routers
app.use('/appsurat', routerSurat);

/*
//error
app.use((req, res, next) => {
    var err = new Error('Page not Found');
    err.status = 404;
    next(err);
});
*/

app.use((err, req, res, next) => {
    res.status(err.status || 500);
    res.send(err.message);
});

//route untuk home
routerSurat.get('/index_surat', redirectLogin, (req, res) => {
    res.render('index_surat');
});

// get index page
app.get('/', (req, res, next) => {
    res.render('index');
});


//route untuk login
app.get('/login', (req, res) => {
    res.render('login', { title: 'login page' })
});

app.post('/auth', (req, res) => {
    let nip = req.body.nip;
    let password = req.body.password;
    if (nip && password) {
        let sql = "SELECT * FROM USER WHERE nip=? AND PASSWORD=?";
        let query = conn.query(sql, [nip, password], (err, results, fields) => {
            if (results.length > 0) {
                req.session.loggedin = true;
                req.session.username = nip;
                res.redirect('/home');
            } else {
                res.send('Password atau username yang anda masukkan salah!');
            }
            res.end();
        });
    } else {
        res.send('Silahkan masukkan NIP dan Password!');
        res.end();
    }
});


//session logout
routerSurat.get('/logout', (req, res) => {
    req.session = null;
    res.redirect('/login');
});

//server listening
app.listen(8000, () => {
    console.log('server is running at port 8000');
});

/*
try {
    window.$ = window.jQuery = require('jquery');
    window.Popper = require('popper.js').default;
    require('bootstrap');
} catch (e) {};
*/