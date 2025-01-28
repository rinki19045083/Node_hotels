const mongoose = require('mongoose');

//define schema

const personSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    age: {
        type:Number
        
    },
    work: {
        type:String,
        enum: ['chef', 'manager', 'waiter'],
        required: true
    },
    mobile: {
        type:String,
        required: true
    },
    email: {
        type:String,
        required: true,
        unique: true
    },
    address: {
        type:String,
       
    },
    salary: {
        type:Number,
        required: true
    },
    username : {
        type: String,
        required: true
    },
    password: {
        type: String,
        require: true
    }



});

const person = mongoose.model('person', personSchema);
module.exports = person;