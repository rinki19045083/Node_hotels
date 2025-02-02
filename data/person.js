const mongoose = require('mongoose');
const bcrypt = require('bcrypt');


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

//middle ware function "pre": called just before any save operation on db will be performed;
personSchema.pre('save', async function(next){
    const person = this;

    //hash the password only if it has been modified or it is new: not to perform this action if change is related to any other field not the password
    if(!person.isModified('password')) return next();
    try{
        //when password hash generate:
        //generate salt;
        const salt = await bcrypt.genSalt(10);

        //hash passpwrd
        const hashedPassword = await bcrypt.hash(person.password, salt);
        
        //override the password
        person.password = hashedPassword;

    }catch(err){
        return next(err); //

    }
    next();

    //next() is called to perform the next step whatever is in queue
})

personSchema.methods.comparePassword = async function(candidatePassword){
    try{
        //use bcrypt to compare the provided password with the data password(hashed)
        const isPasswordmatch = await bcrypt.compare(candidatePassword, this.password);
        return isPasswordmatch;
    }catch(err){
        throw err;
    }
}

const person = mongoose.model('person', personSchema);
module.exports = person;