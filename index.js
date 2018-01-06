const express = require('express');
const path = require('path');
const passport = require('passport');
var request = require('request');
var OAuth2Strategy = require('passport-oauth2');
var YahooFantasy = require('yahoo-fantasy'); 

var APP_KEY = "";
var APP_SECRET =  "";

passport.serializeUser(function(user, done) {
    done(null, user);
  });
  
passport.deserializeUser(function(obj, done) {
    done(null, obj);
}); 

passport.use(
new OAuth2Strategy({
    authorizationURL: 'https://api.login.yahoo.com/oauth2/request_auth',
    tokenURL: 'https://api.login.yahoo.com/oauth2/get_token',
    clientID: APP_KEY,
    clientSecret: APP_SECRET,
    callbackURL: "https://fantasyfootballviewer.herokuapp.com" + '/auth/yahoo/callback'
}, function(accessToken, refreshToken, params, profile, done) {
    
    var options = {
    url: 'https://social.yahooapis.com/v1/user/' + params.xoauth_yahoo_guid + '/profile?format=json',
    method: 'get',
    json: true,
    auth: {
        'bearer': accessToken
    }
    };

    request(options, function (error, response, body) {
    if (!error && response.statusCode == 200) {
        var userObj = {
        id: body.profile.guiid,
        name: body.profile.nickname,
        avatar: body.profile.image.imageUrl,
        accessToken: accessToken,
        refreshToken: refreshToken
        };

        app.yf.setUserToken(accessToken);

        return done(null, userObj);
    }
    });
}
));

var app = express();
app.yj = new YahooFantasy(APP_KEY, APP_SECRET);
app.use(passport.initialize());
app.use(passport.session());
app.use(express.static(path.join(__dirname, 'client/build')));
  
// Last three league keys
// 348.l.1210268
// 359.l.606258
// 371.l.902083
  
app.get('/api/league/standings',
  passport.authenticate('oauth2', { failureRedirect: '/login' }),
  function(req, res) {
    app.yf.leagues.fetch(
        "348.l.1210268, 359.l.606258, 371.l.902083",
        "standings", // optional 
        function(err, data) {
          if (err)
            res.redirect("/error");
       
          res.send(data);
        }
      );
  }
);

// The "catchall" handler: for any request that doesn't
// match one above, send back React's index.html file.
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname+'/client/build/index.html'));
  });
  
const port = process.env.PORT || 5000;
app.listen(port);
  
console.log(`Fantasy Viewer listening on ${port}`);