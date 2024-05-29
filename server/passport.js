const passport = require('passport');
const userModel = require('./model/user.model');
const GoogleStrategy = require('passport-google-oauth20').Strategy;

function generateRandomPassword() {
  return Math.random().toString().slice(2, 10); 
}

passport.use(new GoogleStrategy({
  clientID: process.env.CLIENT_ID,
  clientSecret: process.env.CLIENT_SECRET,
  callbackURL: "/auth/google/callback",
  scope: ['profile', 'email']
},
function(accessToken, refreshToken, profile, cb) {
  userModel.findOne({ email: profile.emails[0].value })
    .then(user => {
      if (!user) {
        const newUser = new userModel({
          fullName: `${profile?.name?.familyName} ${profile?.name?.givenName}`,
          image: profile?.photos[0]?.value,
          email: profile?.emails[0]?.value,
          password: generateRandomPassword() 
        });
        newUser.save()
          .then(savedUser => {
            return cb(null, savedUser);
          })
          .catch(err => {
            return cb(err);
          });
      } else {
        return cb(null, user);
      }
    })
    .catch(err => {
      return cb(err);
    });
}
));

passport.serializeUser((user, done) => {
  done(null, user); 
});

passport.deserializeUser((user, done) => {
  done(null, user); 
});
