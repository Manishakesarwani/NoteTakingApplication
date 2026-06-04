const { ReturnDocument } = require("mongodb");
const mongoose = require("mongoose");

const schema = mongoose.Schema;

const userModel = new schema({
    email:{
        required: true,
        type: String,
        unique: true,
        lowercase: true
    },
    password: {
        type: String
    },
    isVerified: {
        type: Boolean,
        default: false
    },
    OTP: {
        type: String
    },
    OTPExpires: {
        type: Date
    }

}, {timestamps: true});


//OTP Verification method

userModel.statics.otpVerification = async function(email, submittedOTP) {
    const user = await this.findOne({email: email.toLowerCase()});

    if(!submittedOTP || submittedOTP.length != 6){
        throw Error("Please mention 6 digit OTP for authentication!");
    }
    else if(!user || !user.OTP){
        throw Error("Invalid Request!");
    }
    else if(submittedOTP != user.OTP){
        throw Error("Invalid OTP!");
    }
    else if(new Date() > user.OTPExpires){
        throw Error("OTP is expired.")
    }

    const updatedUser = await this.findOneAndUpdate({_id: user._id}, {
        OTP: null,
        OTPExpires: null,
        isVerified: true
    }, {returnDocument: 'after'});

    return updatedUser;
}

module.exports=mongoose.model("UserModel", userModel);