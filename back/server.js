const express = require('express');
const app = express();
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var passport = require('passport');
const session = require('express-session');
var path = require('path');
var morgan = require('morgan');
const db = require('./config/db');
const apiRoutes = require('./routes');
const { Usuarios } = require('./models/Usuario');
const Productos = require('./models/Producto')
const Categorias = require('./models/Categorias')
const SequelizeStore = require('connect-session-sequelize')(session.Store);
const sessionStore = new SequelizeStore({ db });
const PORT = process.env.PORT || 8080;

//Linea de Seedeo de la base de datos
const { usuarios, productos, categorias, iPhone, samsung } = require('../data')



app.use(cookieParser());
app.use(
  session({
    secret: 'passport',
    store: sessionStore,
    resave: false,
    saveUninitialized: false
  })
);



// ESTRATEGIAS DE LOGIN
var rimraf = require("rimraf");
rimraf("back/public/temp", ()=> {} );

// fs.rmdir('/back/public/temp')


const LocalStrategy = require('passport-local').Strategy;
const FacebookStrategy = require('passport-facebook').Strategy;
var GoogleStrategy = require('passport-google-oauth2').Strategy;
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(passport.initialize()); /* esta linea es de configuracion y cuidado con el orden, poner antes de las rutas*/
app.use(passport.session()); /* esta idem */
app.use(morgan('dev'));
app.use('/api', apiRoutes);

passport.serializeUser(function (user, done) {
  done(null, user.id);
}); /* esta funcion esta serializando el usuario=> como guardo el usuario */

passport.deserializeUser(function (id, done) {
  Usuarios.findByPk(id)
    .then(user => done(null, user));
}); /* esta funcion esta deserializando el usuario => como veo el usuario */

// ESTRATEGIAS DE AUTORIZACION

passport.use(new LocalStrategy(
  {
    usernameField: 'email',
    passwordField: 'password'
  },
  function (username, password, done) {
    Usuarios.findOne({ where: { email: username } })
      .then(function (user) {
        if (!user) {
          return done(null, false, { message: 'Incorrect username.' });
        }
        if (!user.validPassword(password)) {
          return done(null, false, { message: 'Incorrect password.' });
        }
        return done(null, user);
      })
      .catch(done);
  }
));

passport.use(new FacebookStrategy(
  {
    clientID: 534343110422200,
    clientSecret: '74332d39f7be9566a75186136ebc6c43',
    callbackURL: 'http://localhost:8080/',
    profileFields: ['id', 'email', 'gender', 'link', 'locale', 'name', 'timezone', 'updated_time', 'verified']
  },
  function (accessToken, refreshToken, profile, done) {
    var values = {
      nombre: profile._json.first_name,
      apellido: profile._json.last_name,
      email: profile._json.email,
      domicilio: profile._json.email,
      password: profile._json.id,
      isAdmin: false
    };
    var selector = { where: { email: profile._json.email } };

    Usuarios.findOne(selector)
      .then(usuario => {
        if (!usuario) {
          Usuarios.create(values)
            .then(user => done(user))
            .catch(err => done(err));
        } else {
          return done(usuario);
        }
      });
  }
));

passport.use(new GoogleStrategy(
  {
    clientID: '575356366611-oe9hvokav8cl63iah1ae1babo8fap8se.apps.googleusercontent.com',
    clientSecret: 'KXgQzcANwnz73Z5dnZvO5Ffj',
    callbackURL: 'http://localhost:8080/'
  },
  function (accessToken, refreshToken, profile, done) {

    var values = {
      nombre: profile.given_name,
      apellido: profile.family_name,
      email: profile.email,
      domicilio: profile.family_name,
      password: profile.sub,
      isAdmin: false
    };


    var selector = { where: { email: profile.email } };

    Usuarios.findOne(selector)
      .then(usuario => {
        if (!usuario) {
          Usuarios.create(values)
            .then(user => done(user))
            .catch(err => done(err));
        } else {
          return done(usuario);
        }
      });
  }
));



// /* TODAS LAS RUTAS DE USUARIO */

// app.get('/api/auth/facebook',
//   passport.authenticate('facebook',
//     {
//       scope: ['email']
//     }
//   ));

// app.get('/api/auth/google',
//   passport.authenticate('google',
//     {
//       scope: ['email']
//     }
//   ));

// app.get('/auth/facebook/callback',
//   passport.authenticate('facebook', {
//     scope: ['email'],
//     successRedirect: '/',
//     failureRedirect: '/login'
//   }));

// app.get('/auth/google/callback',
//   passport.authenticate('google', {
//     successRedirect: '/',
//     failureRedirect: '/login'
//   }));

// app.post('/api/usuarios/esAdm', (req, res) => {
//   Usuario.findOne(req.body)
//     .then(data => Usuario.update({ isAdmin: false }, { where: { isAdmin: true } }))
//     .then(data => res.send(data));
// });

// app.get('/api/usuarios/todos', (req, res) => {
//   if (!req.user.dataValues.nombre) res.send(404, 'cantfindthat');
//   res.send(req.user.dataValues.nombre);
// });

// app.get('/failurelogin', (req, res) => {
//   res.send('cantfindthat');
// });

// app.post('/api/usuarios/crea', (req, res) => {
//   Usuario.create(req.body.user)
//     .then(data => res.status(201).send(data));
// });

// // app.post('/usuarios/login', passport.authenticate('local', { successRedirect: '/usuarios/todos',failureRedirect: '/'}))
// app.post('/api/usuarios/login', passport.authenticate('local', { failureRedirect: '/failurelogin' }),
//   function (req, res) {
//     res.redirect('/api/usuarios/todos');
//   });

app.use(express.static(path.resolve(__dirname, 'public')));

app.get('/*', function (req, res) {
  res.sendFile(path.join(__dirname, './public/index.html'));
});

 

sessionStore.sync()
  .then(() => {
    db.sync({ force: false }).then((con) => {
      console.log(`${con.options.dialect} database ${con.config.database} connected at ${con.config.host}:${con.config.port}`);
      app.listen(PORT, () => console.log('SERVER LISTENING AT PORT', PORT));
    });
  })
  .then(() => {
    Productos.create(iPhone, { individualHooks: true })
      .then(producto => producto.setCategorias([3, 5, 7]))
    Productos.create(samsung, { individualHooks: true })
      .then(producto => producto.setCategorias([3, 4, 6]))
    Productos.bulkCreate(productos, { individualHooks: true })
    Usuarios.bulkCreate(usuarios, { individualHooks: true });
    Categorias.bulkCreate(categorias, { individualHooks: true });
  })
  .then(() => console.log('Base de datos Seedeada con exito'))
  .catch(err => console.log(err))