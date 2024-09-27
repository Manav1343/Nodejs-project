const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
    service:'gmail',
    auth:{
        user:'mnv13it@gmail.com',
        pass:'jjzm ongy imjm ttwy'
    }
})



function sendMailer(to,subject,html){
    const options = {
        from:'mnv13it@gmail.com',
        to:to,
        subject:subject,
        html:html
    }
    transporter.sendMail(options,(err)=>{
        if(err){
            console.log(err);
        }else{
            console.log("Sent Mail");
        }
    })
}

module.exports = sendMailer