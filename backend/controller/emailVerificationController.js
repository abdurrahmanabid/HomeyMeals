const User = require ("../model/User")

const emailVerificationController = async(req,res) =>{
    let existingUser = await User.findOneAndUpdate({email : req.params.email},{emailVerify:true},{new:true})
    console.log(existingUser)

    if(existingUser == null)
    {
        return res.send ("Email not found")
    }else{
        return res.send ("Email verified")
    }
}

module.exports = emailVerificationController