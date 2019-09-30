const express = require('express');
// const cors = require('cors');
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
const Puntajes = require('./models/Puntajes')
const Reviews = require('./models/Reviews')
const chalk = require('chalk')
const SequelizeStore = require('connect-session-sequelize')(session.Store);
const sessionStore = new SequelizeStore({ db });
var fs = require('fs');
var GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
var https = require('https');
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
rimraf("back/public/temp", () => { });


const LocalStrategy = require('passport-local').Strategy;
const FacebookStrategy = require('passport-facebook').Strategy;
var GoogleStrategy = require('passport-google-oauth2').Strategy;
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(passport.initialize()); /* esta linea es de configuracion y cuidado con el orden, poner antes de las rutas*/
app.use(passport.session()); /* esta idem */
app.use(morgan('dev'));
app.use('/api', apiRoutes);

// app.use(cors());



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

passport.use(new GoogleStrategy({
  clientID: '841605176109-ms2j7va58semk3kakb7kremgvl2o7fhf.apps.googleusercontent.com',
  clientSecret: 'ZcDHUJAQ8o5xE2JT2djLjYjj',
  callbackURL: "/api/usuarios/auth/google/callback",
  profileFields: ['id', 'displayName', 'gender', 'photos', 'emails']
},
  (accessToken, refreshToken, profile, done) => {
    var { id, picture, gender, email, name } = profile;
    console.log('profile ', profile)
    // console.log('todos los prof fields ',profileFields)
    // []
    var gender = () => {
      if (gender == 'male') return 'Masculino'
      if (gender == 'female') return 'Femenino'
      else return 'No especificado'
    }


    Usuarios.findOne({ where: { email: email } })
      .then(user => {
        if (user) {
          user.setGoogle([id])
            .then(user => {
              return done(null, user)
            })
        }
        else {
          Usuarios.create({
            nombre: name.givenName,
            apellido: name.familyName,
            domicilio: 'No especificado',
            genero: gender ? gender() : 'No especificado',
            email: email,
            password: accessToken,
            avatar: picture
          })
            .then(user => {
              user.setGoogle([id])
                .then(user => {

                  return done(null, user)
                })
            })
        }
      })
  })
)

passport.use(new FacebookStrategy({
  clientID: '620838298442887',
  clientSecret: '7b50dfa31605b2e363e38934d74f4473',
  callbackURL: "/api/usuarios/auth/facebook/callback",
  profileFields: ['id', 'displayName', 'gender', 'photos', 'emails']
},
  (accessToken, refreshToken, profile, done) => {
    var { id, displayName, photos, gender, emails } = profile;
    var emailMap = (emails.map(elem => elem.value))
    console.log(emailMap)
    console.log('profile ', profile)
    // console.log('todos los prof fields ',profileFields)
    // []
    var gender = () => {
      if (gender == 'male') return 'Masculino'
      if (gender == 'female') return 'Femenino'
      else return 'No especificado'
    }


    Usuarios.findOne({ where: { email: emailMap } })
      .then(user => {
        if (user) {
          user.setFacebook([id])
            .then(user => {
              return done(null, user)
            })
        }
        else {
          Usuarios.create({
            nombre: displayName.split(' ')[0],
            apellido: displayName.split(' ')[1],
            domicilio: 'No especificado',
            genero: gender ? gender() : 'No especificado',
            email: emailMap[0],
            password: accessToken,
            avatar: photos[0].value
          })
            .then(user => {
              user.setFacebook([id])
                .then(user => {

                  return done(null, user)
                })
            })
        }
      })
  })
)



app.use(express.static(path.resolve(__dirname, 'public')));

app.get('/*', function (req, res) {
  res.sendFile(path.join(__dirname, './public/index.html'));
});



sessionStore.sync()
  .then(() => {
    db.sync({ force: false }).then((con) => {
      console.log(`${con.options.dialect} database ${con.config.database} connected at ${con.config.host}:${con.config.port}`);

      // https.createServer({
      //   key: fs.readFileSync('back/cert.key'),
      //   cert: fs.readFileSync('back/cert.crt')
      // }, app).listen(PORT, () => console.log('SERVER LISTENING AT PORT', PORT));
      app.listen(PORT, () => console.log('SERVER LISTENING AT PORT', PORT))
    });
  })
  // Para detener el seedeo de la base de datos borrar o comentar las lineas que estan mas abajo
  // .then(()=>{

  //   var copydir = require('copy-dir');

  //   copydir.sync('back/public/utils/Test/Telefonos', 'back/public/utils/Telefonos', {
  //     utimes: true,  // keep add time and modify time
  //     mode: true,    // keep file mode
  //     cover: true    // cover file when exists, default is true
  //   });
  //   copydir.sync('back/public/utils/Test/Usuarios', 'back/public/utils/Usuarios', {
  //     utimes: true,  // keep add time and modify time
  //     mode: true,    // keep file mode
  //     cover: true    // cover file when exists, default is true
  //   });
  // })
  // .then(() => {
  //   Productos.create(iPhone, { individualHooks: true })
  //     .then(producto => producto.setCategorias([3, 5, 7]))
  //   Productos.create(samsung, { individualHooks: true })
  //     .then(producto => producto.setCategorias([3, 4, 6]))
  //   Productos.bulkCreate(productos, { individualHooks: true })
  //   Usuarios.bulkCreate(usuarios, { individualHooks: true });
  //   Categorias.bulkCreate(categorias, { individualHooks: true })

  //   .then(() => console.log('Base de datos Seedeada con exito'))
  //   .catch(err => console.log(err)) 
  // })


  // .then(() => {
  //   Promise.all([
  //     Usuarios.bulkCreate(usuarios, { individualHooks: true }),
  //     Categorias.bulkCreate(categorias, { individualHooks: true }),
  //     Productos.create(iPhone, { individualHooks: true }).then(producto => {
  //       producto.setCategorias([3, 5, 7])
  //       producto.update({ calificacion: 4 })
  //     }),
  //     Puntajes.create({ Puntaje: 4 })
  //       .then(puntaje => {
  //         puntaje.setProducto(1);
  //         puntaje.setUsuario(1)
  //       }),
  //     Reviews.create({ Review: 'Muy buen telefono, me gustaria que la bateria dure mas pero en todo lo demas es excelente' })
  //       .then(review => review.setPuntaje(1)),
  //   ])
  //     .then(() => {
  //       Puntajes.findByPk(1)
  //         .then(puntaje => puntaje.setReview(1))
  //     })
  // })
