const session = require('express-session');
const MongoStore = require('connect-mongo')(session);

// --

app.use(session({
  store: new MongoStore({
    mongooseConnection: mongoose.connection,
    ttl: 24 * 60 * 60 // 1 day
  }),
  secret: 'some-string',
  resave: true,
  saveUninitialized: true,
  cookie: {
    maxAge: 24 * 60 * 60 * 1000
  }
}));


// note1: currentUser needs to match whatever you use in login/signup/logout routes
// note2: if using passport, req.user instead
app.use(function (req, res, next) {
  app.locals.user = req.session.currentUser;
  next();
});