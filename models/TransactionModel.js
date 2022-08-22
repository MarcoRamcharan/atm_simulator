const mongoose = require('mongoose')

const Schema = mongoose.Schema

const transactionSchema = new Schema({
    type:{
        type: String,
    },
    user_id:{
        type: String,
    },
    balance:{
        type: String,
    },
    amount:{
        type: String,
    },
    date:{
        type: String,
    }
},
{timestamps: true})

module.exports = mongoose.model('transaction', transactionSchema)

