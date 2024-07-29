const mongoose = require('mongoose');

// define the person schema
const personSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true
    },
    age:{
        type: Number,
        required: true
    },
    work:{
        type:String,
        enum: ['chef','manager','waiter'],
        required: true
    },
    mobile:{
        type:Number,
        required: true

    },
    email:{
        type:String,
        required: true,
        unique: true
    },
    address:{
        type: String,
        required: true
    },
    salary:{
        type:String,
        required: true,

    },
    username:{
        type: String,
        required: true,
    },
    password:{
        type: String,
        required: true
    }
})

// create person model
const Person = mongoose.model('Person',personSchema);
module.exports = Person;