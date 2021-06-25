const { default: axios } = require("axios");



function forgotPassword(e){
    e.preventDefault();
    window.location.href="../frontend/fpwd.html"
}


function getPassword(e){
    e.preventDefault()
    const form= new FormData(e.target)

    axios.post('http://localhost:3000/called//password/forgotpassword').then(res=>{
        console.log(res)
    }).catch(err=>{
        console.log(err)
    })

}