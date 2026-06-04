const {Resend} = require("resend");
const fs=require("fs");
const path=require("path");

require("dotenv").config({path: path.resolve(__dirname, "../.env")});

const resend = new Resend(process.env.RESEND_API_KEY)

exports.send_Mail = async (reciever, emailSubject, emailBody) => {
    try{
        

        const response = await resend.emails.send({
            from: "VMS-verified-email@visitormanagementsystem.shop",
            to: reciever,
            subject: emailSubject,
            html: emailBody
        });
        if(response.error){
            console.log("Email sent failed", response.error);
        }
        else{
            console.log("Email sent", response.data);
        }
         
    }catch(err){
        console.log("Error", err.message);
        throw err;
    }
}