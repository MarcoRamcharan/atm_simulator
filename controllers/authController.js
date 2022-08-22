const User = require('../models/userModel')
const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')


const createToken = (_id) => {
    return jwt.sign({_id}, 'hello', { expiresIn: '3d'})
}


//post user
const createUser = async (req, res) =>{
    
    const {accountNumber, pin, balance} = req.body
    try{
        if(!accountNumber || !pin){
            throw Error('all fields must be filled')
        }

        const exists = await User.findOne({accountNumber})

        if(exists){
            throw Error('accountNumber already exists')
        }

        const salt = await bcrypt.genSalt(10)
        const hash = await bcrypt.hash(pin, salt)

        const user = await User.create({accountNumber, pin: hash, balance})

        const token = createToken(user._id)

        res.status(200).json({accountNumber, token})
        
    }catch(error){
        res.status(400).json({error: error.message})
    }
}


//signin user
const loginUser = async (req, res) =>{

    const {accountNumber, pin} = req.body
    try{
        if(!accountNumber || !pin){
            throw Error('all fields must be filled')
        }

        const user = await User.findOne({accountNumber})

        if(!user){
            throw Error('incorrect account number')
        }

        const match = await bcrypt.compare(pin, user.pin)


        
        if(!match){
            throw Error('incorrect pin')
        }

        const token = createToken(user._id)

        res.status(200).json({accountNumber, token})
        
    }catch(error){
        res.status(400).json({error: error.message})
    }
}


module.exports = {
    createUser,
    loginUser,
}