const express = require('express')
const router = express.Router()
const {createTransaction, getTransactions, setBalance, getBalance, setPin} = require('../controllers/transactionController')

const Auth = require('../middlewear/requireAuth')
router.use(Auth)



//create a job
router.post('/create', createTransaction)

//create a job
router.post('/setBalance', setBalance)

//create a job
router.post('/setPin', setPin)

//get jobs for a single employer
router.get('/getTransactions', getTransactions)

//get jobs for a single employer
router.get('/getBalance', getBalance)


module.exports = router