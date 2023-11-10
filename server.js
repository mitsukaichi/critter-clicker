const path = require('path');
const express = require('express');
const session = require('express-session');
const exphbs = require('express-handlebars');
const SequelizeStore = require('connect-session-sequelize')(session.Store);

const routes = require('./controllers');
const sequelize = require('./config/connection');
const helpers = require('./utils/helpers');

//
// const cloudinary = require('cloudinary').v2;
// require('dotenv').config();

// cloudinary.config({
//   cloud_name: CLOUD_NAME,
//   api_key: CLOUD_KEY,
//   api_secret: CLOUD_SECRET,
//   secure: true
// });
//
const app = express();
const PORT = process.env.PORT || 3001;

const sess = {
  secret: 'Something something something',
  cookie: {
    maxAge: 1720000,
    httpOnly: false,
  },
  resave: false,
  saveUninitialized: true,
  store: new SequelizeStore({
    db: sequelize,
  }),
};

app.use(session(sess));

const hbs = exphbs.create({ helpers });

app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

app.use(routes);

sequelize.sync({ force: false }).then(() => {
  app.listen(PORT, () => console.log(`Now listening at http://localhost:${PORT}`));
});