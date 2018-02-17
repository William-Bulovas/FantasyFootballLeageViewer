const express = require('express');
const path = require('path');
const passport = require('passport');
var request = require('request');
var OAuth2Strategy = require('passport-oauth2');
var YahooFantasy = require('yahoo-fantasy'); 
var logger = require('morgan');

var APP_KEY = process.env.YAHOO_APP_KEY;
var APP_SECRET =  process.env.YAHOO_SECRET_KEY;

var yf = new YahooFantasy(APP_KEY, APP_SECRET);

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

        yf.setUserToken(accessToken);
        

        return done(null, userObj);
    }
    });
}
));

var app = express();
app.use(passport.initialize());
app.use(passport.session());
app.use(express.static(path.join(__dirname, 'client/build')));
app.use(logger('dev'));

app.get('/login',
    passport.authenticate('oauth2', { failureRedirect: '/login' }),
    function(req, res) {
        res.send("login");
    }
);

app.get('/auth/yahoo/callback',
    passport.authenticate('oauth2', { failureRedirect: '/login' }),
    function(req, res) {
        res.redirect(req.session.redirect || '/');
    } 
);


// Last three league keys
// 348.l.1210268
// 359.l.606258
// 371.l.902083

// Constants for the league keys
const CURRENTKEY = "371.l.902083";
const ALLKEY = "348.l.1210268, 359.l.606258, 371.l.902083";
  
// Api to get all of the standings in the league so far
app.get('/api/league/standings',
    function(req, res) {
        yf.leagues.fetch(
            ALLKEY,
            "standings",
            function(err, data) {
            if (err){
                res.send("error");
                return;
            }
        
            res.json(data);
            }
        );
    }
);

// Api query for only the current standings
app.get('/api/league/standings/current',
    function(req, res) {        
        yf.league.standings(
            CURRENTKEY,
            function(err, data) {
                if (err){
                    res.send("error");
                    return;
                }
            
                res.json(data);
            }
        );
    }
);

app.get('/api/league/career',
    function(req, res) {
        // We need to get all of the standings from the league to compute the career totals
        yf.leagues.fetch(
            ALLKEY,
            "standings",
            function(err, data) {
                if (err){
                    res.send("error");
                    return;
                }
                var careerTotals = {};

                data.forEach((year) => {
                    year["standings"].forEach((row) => {
                        var manager = row["managers"][0]["guid"];
                        if (careerTotals.hasOwnProperty(manager)) {
                            careerTotals[manager]["years_played"] += 1;
                            careerTotals[manager]["results"].push({
                                "result" : row["standings"]["rank"],
                                "year" : year["league_key"]
                            });
                            careerTotals[manager]["movesMade"] = parseInt(careerTotals[manager]["movesMade"]) + parseInt(row["number_of_moves"]);
                            careerTotals[manager]["tradesMade"] += parseInt(row["number_of_trades"]);
                            careerTotals[manager]["pointsFor"] += parseInt(row["standings"]["points_for"]);
                            careerTotals[manager]["pointsAgainst"] += parseInt(row["standings"]["points_against"]);
                            careerTotals[manager]["wins"] += parseInt(row["standings"]["outcome_totals"]["wins"]);
                            careerTotals[manager]["losses"] += parseInt(row["standings"]["outcome_totals"]["losses"]);        

                        } else {
                            careerTotals[manager] = {};
                            careerTotals[manager]["manager"] = row["managers"];
                            careerTotals[manager]["years_played"] = 1;
                            careerTotals[manager]["results"] = [];
                            careerTotals[manager]["results"].push({
                                "result" : row["standings"]["rank"],
                                "year" : year["league_key"]
                            });
                            careerTotals[manager]["movesMade"] = parseInt(row["number_of_moves"]);
                            careerTotals[manager]["tradesMade"] = parseInt(row["number_of_trades"]);
                            careerTotals[manager]["pointsFor"] = parseInt(row["standings"]["points_for"]);
                            careerTotals[manager]["pointsAgainst"] = parseInt(row["standings"]["points_against"]);
                            careerTotals[manager]["wins"] = parseInt(row["standings"]["outcome_totals"]["wins"]);
                            careerTotals[manager]["losses"] = parseInt(row["standings"]["outcome_totals"]["losses"]);        
                        }
                    });
                });
                res.json(careerTotals);
            }
        );
    }
);

app.get('/api/league/teams/career/rosters',
    function(req, res){
        yf.teams.leagues(
            ALLKEY,
            "roster",
            function(err, data) {
                if (err) {
                    res.send("error");
                    return;
                }
                var careerTeams = {};

                data.forEach((year) => {
                    year["teams"].forEach((row) => {
                        var manager = row["managers"][0]["guid"];
                        if (careerTeams.hasOwnProperty(manager)) {
                            careerTeams[manager]["years_played"] += 1;
                            careerTeams[manager]["roster"].push({
                                "year" : year["season"],
                                "roster" : row["roster"]
                            });
                        } else {
                            careerTeams[manager] = {};
                            careerTeams[manager]["manager"] = row["managers"];
                            careerTeams[manager]["years_played"] = 1;
                            careerTeams[manager]["roster"] = [];
                            careerTeams[manager]["roster"].push({
                                "year" : year["season"],
                                "roster" : row["roster"]
                            });
                        }
                    });
                });
                res.json(careerTeams);
            }
        );
    }
)


// The "catchall" handler: for any request that doesn't
// match one above, send back React's index.html file.
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname+'/client/build/index.html'));
  });
  
const port = process.env.PORT || 5000;
app.listen(port);
  
console.log(`Fantasy Viewer listening on ${port}`);