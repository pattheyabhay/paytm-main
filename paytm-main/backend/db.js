const mongoose = require('mongoose')

const url = 'mongodb+srv://admin:12345678910@cluster0.9dgfcrj.mongodb.net/User';

mongoose.connect(url, {usenewUrlParser : true, useUnifiedTopology : true})
.then(()=>console.log('connected to MongoDb'))
.catch(err=>console.error('error connecting to MongoDB', err));

// create schema

const userSchema = new mongoose.Schema({
    username:{
        type: String,
        required: true,
        unique: true,
        trim: true,
        lowercase: true,
        minLength: 3,
        maxLength: 30
    },

    passward:{
        type: String,
        required: true,
        minLength: 6
    },

    firstName:{
        type: String,
        required: true,
        trim: true,
        maxLength: 50
    },

    lastName:{
        type: String,
        required: true,
        trim: true,
        maxLength: 50
    }
})


const accountSchema =  new mongoose.Schema({
    userID:{
        type: String,
    },
    balance:{
        type: Number,
    }
})

// Creating Model out for Schemas
const User = mongoose.model('User', userSchema)
const Account = mongoose.model('Account', accountSchema)

module.exports={
    User,
    Account,
}