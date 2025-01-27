const mongoose = require('mongoose');
require('dotenv').config();

//const mongoURL_local = process.env.mongoURL_local;

// const mongoURL = 'mongodb+srv://kririnki146:Manika123@rchaudhary18.siyto.mongodb.net/'

const mongoURL = process.env.MONGODB_URL;
mongoose.connect(mongoURL, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})

const db = mongoose.connection;


//event listeners: when we perform any action on database, event listeners listen and respond on it.
db.on('connected', ()=>{
    console.log('connected');
})

//export db here
module.exports = db;

