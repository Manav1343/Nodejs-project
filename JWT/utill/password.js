const bcrypt = require('bcryptjs')
exports.haspass = async (password)=>{
       try {
         const salt = await bcrypt.genSalt(10)
         const hash = await bcrypt.hash(password,salt)
     
     return hash
       } catch (error) {
        console.log(error);
       }
}
exports.comparePass = async (password,hashpass)=>{
    try {
        const match = await bcrypt.compare(password,hashpass);
        return match
    } catch (error) {
     console.log(error);   
    }
}
