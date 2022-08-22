const Transaction = require('../models/TransactionModel')
const User = require('../models/userModel')
const mongoose = require('mongoose')
const bcrypt = require('bcrypt')


const createTransaction = async (req, res) => {
    const user_id = req.user._id
    const {type, amount, date, balance} = req.body
    console.log(type, amount, balance, date)
    try{
        const transaction = await Transaction.create({type, amount, date, balance,  user_id})
        res.status(200).json(transaction)
    }catch(error){
        res.status(400).json({error : error.message})
    }
}


const getTransactions = async (req, res) =>{
    const user_id = req.user._id
    try{
        const transactions = await Transaction.find({user_id}).sort({createdAt: -1})
        res.status(200).json(transactions)
    }catch(error){
        res.status(400).json({error : error.message})
    }
}

const setBalance = async (req, res) =>{
    const user_id = req.user._id
    const {newbalance} = req.body
    try{
        const newBalance = await User.findByIdAndUpdate(user_id, { balance: newbalance })
        res.status(200).json(newBalance)
        console.log(newBalance)
    }catch(error){
        res.status(400).json({error : error.message})
    }
}

const setPin = async (req, res) =>{
    const _id = req.user._id
    const {newPin, oldPin} = req.body
    console.log(newPin)

    const user = await User.findOne({_id})

    if(!user){
        throw Error('user not exist')
    }
    
    const match = await bcrypt.compare(oldPin, user.pin)

    if(!match){
        throw Error('passwords dont match')
    }

    const salt = await bcrypt.genSalt(10)
    const hash = await bcrypt.hash(newPin, salt)

    try{
        const newpin = await User.findByIdAndUpdate(_id, { pin: hash })
        res.status(200).json(newpin.pin)
        console.log(newPin.pin)
    }catch(error){
        res.status(400).json({error : error.message})
    }
}

const getBalance = async (req, res) =>{
    const user_id = req.user._id
    try{
        const user = await User.findById(user_id)
        res.status(200).json(user)
        console.log(user)
    }catch(error){
        res.status(400).json({error : error.message})
    }
}


module.exports = {
    createTransaction,
    getTransactions,
    setBalance,
    getBalance,
    setPin
}