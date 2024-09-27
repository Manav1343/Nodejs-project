const bcrypt = require('bcrypt')

exports.haspass = async (password)=>{
    const hasPassword = await bcrypt.hash(password,10)
    return hasPassword
}
exports.comaparePass= async (hasPass,password)=>{
    return await bcrypt.compare(password,hasPass)
}

