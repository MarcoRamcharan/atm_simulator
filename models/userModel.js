const mongoose = require('mongoose')

const Schema = mongoose.Schema

const userSchema = new Schema({
    accountNumber:{
        type: String,
        required: true
    },
    pin:{
        type: String,
        required: true
    },
    balance:{
        type: Number,
        required: true
    }
},
{timestamps: true})

module.exports = mongoose.model('user', userSchema)