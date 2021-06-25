
const ordermodel=require('../model/expensemodel')

exports.getordermodel=(req,res)=>{
    
    ordermodel.findAll({where:{id:1}}).then(result=>{
        console.log(result)
        return res.json(result);
    }).catch(err=>res.json(err))
}


