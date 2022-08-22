const express = require('express')
const app = express()
const mongoose = require('mongoose')
const path = require('path')

const cors = require('cors')
const authRoutes = require('./routes/authRoutes')
const transactionRoutes = require('./routes/transactionRoutes')

app.use(cors())
app.use(express.urlencoded({extended: true}))
app.use(express.json())
app.use('/api/auth', authRoutes )
app.use('/api/transactions', transactionRoutes)



mongoose.connect('mongodb+srv://marcomongo:mongomarco@marcosclusterno1.kzoqh.mongodb.net/ATM?retryWrites=true&w=majority')
.then(()=>{
    console.log('connected to the database')
})
.catch((error) => { console.log(error)})

app.use(express.static(path.join(__dirname, './client/build')))

app.get('*', function(_, res){
    res.sendFile(
        path.join(__dirname, './client/build/index.html'),
        function(err){
            if(err){
                res.status(500).send(err)
            }
        }
    )
})

app.listen(process.env.PORT || 5000, ()=>{
console.log('server running')
})