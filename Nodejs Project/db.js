const mongoose = require('mongoose');

const mongoURL = 'mongodb://localhost:27017/hotels'
mongoose.connect(mongoURL, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})

const db = mongoose.connection;


//event listeners: when we perform any action on database, event listeners listen and respond on it.
db.on('connected', ()=>{
    console.log('connected');
})

//export db
module.exports = db;
