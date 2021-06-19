
const sequelize=require('./util/database')
const Expense=require('./model/expensemodel')
const Users=require('./model/usermodel')



Users.hasMany(Expense)
Expense.belongsTo(Users)



sequelize.sync({force:true})
.then(res=>console.log(res))
.catch(err=>console.log(err))
