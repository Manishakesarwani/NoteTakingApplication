const express=require("express");
const { completeAuthentication, requestOTP, verifyOtp, resendOTP, forgotPassword } = require("../controllers/UserController");
const UserRoute = express.Router();

UserRoute.post("/request-otp", requestOTP);

UserRoute.post("/verify-otp", verifyOtp);

UserRoute.post("/authentication", completeAuthentication);

UserRoute.post("/resend-otp", resendOTP);

UserRoute.patch("/forgot-password", forgotPassword);



module.exports=UserRoute;