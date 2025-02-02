const passport = require('passport');
const LocalStrategy  = require('passport-local').Strategy;  //username-password from the request body
const person = require('./data/person')



//authentication configure
passport.use(new LocalStrategy(async (username, password, done) =>{
    //authentication
 try{
 console.log("received credentials");

 const user = await person.findOne({username: username});
 if(!user)
     return done(null, false,{message: 'Incorrect username'});
const isPasswordmatch = user.comparePassword(password);
//user.password === password ? true : false;
if(isPasswordmatch){
    return done(null, user, {message: "user is correct"});
}else{
    return done(null, false, {message: "wrong password"});
}

 }catch(err){
return done(err);
 }
}))

module.exports = passport;