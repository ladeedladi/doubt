const path=require('path')
const express=require('express')
const accessingcontroller=require('../controllers/expensecontroller')
const routes=express.Router()
const rootDir=require('../util/path')



routes.post('/expense',accessingcontroller.getExpense)

module.exports=routes;

