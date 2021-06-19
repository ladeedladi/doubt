
const Expense=require('../model/expensemodel')
const path=require('path');




exports.getExpense=(req,res)=>{
   
const {expenseamount,description,category}=req.body;
console.log(req.user.id)
Expense.create({expenseamount,description,category,userId:req.user.id})
.then(res=>res.status(201).json({res,success:true}))
.catch(err=>res.status(403).json({error:err,success:false}))


}



