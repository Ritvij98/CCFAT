const passport = require('passport')
const JWT = require('jsonwebtoken')
const PassportJWT = require('passport-jwt')
var JwtStrategy = require('passport-jwt').Strategy;
var ExtractJwt = require('passport-jwt').ExtractJwt;
const User = require("./models/records").Users ;

const jwtSecret = '12345-67890-09876-54321';
const jwtAlgorithm = "HS256";
const jwtExpiresIn = 3600;

passport.use(User.createStrategy())

const signUp = (req, res, next) => {
  if (!req.body.email || !req.body.password) {
    res.status(400).send('No username or password provided.')
  }

  const user = new User({
    email: req.body.email,
    name: req.body.name,
    department:req.body.department,
    institute:req.body.institute
  })

  User.register(user, req.body.password, (error, user) => {
    if (error) {
      next(error)
      return
    }
  })

  req.user = user;
  next();
}

const signJWTForUser = (req, res) => {
  const user = req.user
  const token = JWT.sign(
    {
      email: user.email,
      admin: user.admin
      
    },
    jwtSecret,
    {
      algorithm: jwtAlgorithm,
      expiresIn: jwtExpiresIn,
      subject: user._id.toString()
    }
  )
 
 res.json({ token })
 
}


passport.use(
  new PassportJWT.Strategy(
    {
      jwtFromRequest: PassportJWT.ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: jwtSecret,
      algorithms: [jwtAlgorithm]
    },
    (payload, done) => {
      User.findById(payload.sub)
        .then(user => {
              
          if (user) {
             
            done(null, user)
         

          } else {
            done(null, false)
          }
        })
        .catch(error => {
          done(error, false)
        })
    }
  )
)

module.exports = {
  initialize: passport.initialize(),
  signUp,
  signIn: passport.authenticate('local', { session: false }),
  requireJWT: passport.authenticate('jwt', { session: false }),
  signJWTForUser
}