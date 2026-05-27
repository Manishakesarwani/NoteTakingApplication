const express=require("express")
const cors = require("cors");
const dotenv = require("dotenv")
const mongoose = require("mongoose");


const app=express();
dotenv.config()
app.use(cors());

app.use(express.json());

app.get("/", (req, res, next)=>{
    console.log(req.method);
    console.log(req.path);

    return res.status(200).json({
        "message": "Home Page"
    });

});
const PORT=process.env.PORT;
mongoose.connect(process.env.MONGO_URL)
.then(()=>{
    app.listen(PORT, ()=>{
        console.log(`Database connected, server is up and listening to the http://localhost:${PORT}/`)
    });
})
.catch((err)=>{
    console.log(err.message);
})