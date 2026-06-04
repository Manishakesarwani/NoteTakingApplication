const validator = require("validator");
const bcrypt = require("bcrypt");
const UserModel = require("../NotesModel/UserModel");
const { send_Mail } = require("../sendEmail/SendEmail");
const jwt = require("jsonwebtoken");



const createToken = (id) => {
    return jwt.sign({_id: id}, process.env.SECRET_KEY, {expiresIn: '3d'})
}

exports.requestOTP = async(req, res) => {
    const {email} = req.body;

    try{
        if(!email){
            return res.status(400).json({error: "Please mention email!"});
        }
        else if(!validator.isEmail(email)){
            return res.status(400).json({error: "Invalid Email!"});
        }
        else{
            let user = await UserModel.findOne({email: email});
            if(!user){
                user = await UserModel.create({email: email});
            }
            const otp = Math.floor(100000 + Math.random() * 900000).toString();

            const updatedUser = await UserModel.findOneAndUpdate({_id: user._id}, {
                OTP: otp,
                OTPExpires: new Date(Date.now() + 10 * 60 * 1000)
            }, {returnDocument: 'after'});

            await send_Mail(updatedUser.email, `OTP to Verify your account...`, `Hi ${updatedUser.email}, <br><br>OTP to verify your account is <b>${otp}</b>`);

            return res.status(200).json({exists: !!updatedUser.password});

        }
    }
    catch(err){
        return res.status(400).json({error: err.message});
    }
}

exports.verifyOtp = async (req, res) => {
    const {email, otp} = req.body;

    try{
        const user = await UserModel.otpVerification(email, otp);
        return res.status(200).json({message: "Verified", isNewUser: !user.password});
    }
    catch(err){
        return res.status(400).json({error: err.message});
    }
}

exports.completeAuthentication = async(req, res) => {
    const {email, password} = req.body;

    const user = await UserModel.findOne({email: email});

    if(!user.isVerified){
        // throw Error("Email not verified!");
        return res.status(400).json({error: "Email not verified!"});
    }
    if(!user.password){
        if(!password){
            return res.status(400).json({error: "Please set password to sign-in successfully."});
        }
        else if(!validator.isStrongPassword(password)){
            // throw Error("Your Password is not strong.");
            return res.status(400).json({error: "Your Password is not strong."});
        }
        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(password, salt);
    }else{
        if(!password){
            return res.status(400).json({error: "Please mention password to log-in successfully."});
        }
        const match=await bcrypt.compare(password, user.password);
        if(!match){
            // throw Error("Invalid Password.");
            return res.status(400).json({error: "Invalid Password."});
        }
    }

    user.isVerified=false;
    await user.save();

    const token= createToken(user._id);
    return res.status(200).json({email, token});
}

exports.resendOTP = async(req, res) => {
    const {email} = req.body;
    
    try{
        if(!email){
            return res.status(400).json({error: "Please mention email."});
        }
        else if(!validator.isEmail(email)){
            return res.status(400).json({error: "Please mention valid email!"});
        }
        else{
            const user = await UserModel.findOne({email: email});

            if(!user || !user.OTP || !user.OTPExpires){
                return res.status(400).json({error: "Invalid Request!"});
            }
            else{
                const otp = Math.floor(100000 + Math.random() * 900000).toString();

                const updatedUser = await UserModel.findOneAndUpdate({_id: user._id}, {
                    OTP: otp,
                    OTPExpires: new Date(Date.now() + 10 * 60 * 1000)
                }, {returnDocument: 'after'});

                await send_Mail(updatedUser.email, `OTP to Verify your account...`, `Hi ${updatedUser.email}, <br><br>OTP to verify your account is <b>${otp}</b>`);

                return res.status(200).json({exists: !!updatedUser.password});
            }
        }
    }
    catch(err){
        return res.status(400).json({error: err.message});
    }
}

exports.forgotPassword = async(req, res) => {
    const {email, n_password, cnf_password} = req.body;

    try{
        if(!email){
            return res.status(400).json({error: "Please mention email!"});
        }
        else{
            const user=await UserModel.findOne({email: email});

            // console.log(user);

            if(!user.password){
                return res.status(400).json({error: "User not found. Please signup first."})
            }
            else if(!user.isVerified){
                return res.status(400).json({error: "User is not verified!"})
            }
            else if(!n_password || !cnf_password){
                return res.status(400).json({error: "Please mention both the fields."})
            }
            else if(!validator.isStrongPassword(n_password)){
                return res.status(400).json({error: "Your new Password is not strong!"});
            }
            else{
                const match=await bcrypt.compare(n_password, user.password);
                if(match){
                    return res.status(400).json({error: "New Password should not be same as old password."});
                }
                else if(n_password !== cnf_password){
                    return res.status(400).json({error: "New Password and Confirm new password are not same."});
                }
                else{
                    const salt = await bcrypt.genSalt(10);
                    user.password = await bcrypt.hash(n_password, salt);
                    user.isVerified=false;
                    await user.save();

                    return res.status(200).json({message: "Password updated successfully!"})
                }
            }
        }
    }
    catch(err){
        return res.status(200).json({error: err.message});
    }
}