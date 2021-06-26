const password=require('../model/password')
const Users=require('../model/usermodel')
const uuid=require('uuid')
const sgMail = require('sendgrid')
exports.forgotPassword=async(req,res)=>{

    try{
        const {mailid}=req.body;
       const user= await Users.findone({where:{mailid}})

       if(user){
           const id=uuid.v4()
           user.createPassword({id,active:true})
       
         sgmail.setApiKey(process.env.SENDGRID_API_KEY)

const msg={
to:'muhammed.ladeed9656@gmail.com',
  from:'muhammed.ladeed123@gmail.com',
  subject: 'Sending with SendGrid is Fun',
  text: 'and easy to do anywhere, even with Node.js',
  html: `<a href="http://localhost:3000/password/resetpassword/${id}">Reset password</a>`,
  }
  sgMail
  .send(msg)
  .then((response) => {

     
      return res.status(response[0].statusCode).json({message: 'Link to reset password sent to your mail ', sucess: true})

  })
  .catch((error) => {
      throw new Error(error);
  })
    }else {
    throw new Error('User doesnt exist')
}

}catch(err){
    return res.json({ message: err, sucess: false });
}
}

exports.resetpassword = (req, res) => {
    const id =  req.params.id;
    password.findOne({ where : { id }}).then(forgotpasswordrequest => {
        if(forgotpasswordrequest){
            forgotpasswordrequest.update({ active: false});
            res.status(200).send(`<html>
                                    <script>
                                        function formsubmitted(e){
                                            e.preventDefault();
                                            console.log('called')
                                        }
                                    </script>
                                    <form action="/password/updatepassword/${id}" method="get">
                                        <label for="newpassword">Enter New password</label>
                                        <input name="newpassword" type="password" required></input>
                                        <button>reset password</button>
                                    </form>
                                </html>`
                                )
            res.end()

        }
    })
}

exports.updatepassword = (req, res) => {

    try {
        const { newpassword } = req.query;
        const { resetpasswordid } = req.params;
        password.findOne({ where : { id: resetpasswordid }}).then(resetpasswordrequest => {
            Users.findOne({where: { id : resetpasswordrequest.userId}}).then(user => {
                // console.log('userDetails', user)
                if(user) {
                    //encrypt the password

                    const saltRounds = 10;
                    bcrypt.genSalt(saltRounds, function(err, salt) {
                        if(err){
                            console.log(err);
                            throw new Error(err);
                        }
                        bcrypt.hash(newpassword, salt, function(err, hash) {
                            // Store hash in your password DB.
                            if(err){
                                console.log(err);
                                throw new Error(err);
                            }
                            user.update({ password: hash }).then(() => {
                                res.status(201).json({message: 'Successfuly update the new password'})
                            })
                        });
                    });
            } else{
                return res.status(404).json({ error: 'No user Exists', success: false})
            }
            })
        })
    } catch(error){
        return res.status(403).json({ error, success: false } )
    }

}








