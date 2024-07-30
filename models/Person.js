const mongoose = require('mongoose');
const bcrypt = require('bcrypt')

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

personSchema.pre('save', async function(next){
    const person = this;

    // Hash the password only if it has been modified (or it is new)
    if(!person.isModified('password')) return next();

   try {
        // hash password generation
        const salt = await bcrypt.genSalt(10);   // 10 is the length and it is the ideal number

        // hash password
        const hashedPassword = await bcrypt.hash(person.password, salt);

        // Override the plain password with the hashed one
        person.password = hashedPassword;
        next();
   } catch (error) {
        return next(err);
   }
})


personSchema.methods.comparePassword = async function(candidatePassword){
    try {
        // use bcrypt to compare the provided password with the hashed password
        const isMatch = await bcrypt.compare(candidatePassword, this.password);
        return isMatch;
    } catch (error) {
        throw err;
    }
}

// prince ---->>> nsdjnfakjdsfsmdk
//login --->>> pankaj123

//nsdjnfakjdsfsmdk --> extract salt
// salt+pankaj123 -->> hash -->> alsdfanaksnkl
// it will compare nsdjnfakjdsfsmdk == alsdfanaksnkl

// create person model
const Person = mongoose.model('Person',personSchema);
module.exports = Person;