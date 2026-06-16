const express=require("express")
const cors = require("cors");
const dotenv = require("dotenv")
const mongoose = require("mongoose");
const NotesRoute = require("./routes/NotesRoute");
const UserRoute = require("./routes/userRoutes");
const CategoryRoute = require("./routes/CategoryRoute");


const app=express();
dotenv.config()

app.use(express.json());
app.use(cors());

app.use((req, res, next)=>{
    console.log(req.method);
    console.log(req.path);
    next();

});
app.get("/", (req, res, next)=>{

    return res.status(200).json({
        "message": "Home Page"
    });

});
app.use("/user", UserRoute);
app.use("/notes", NotesRoute);
app.use("/categories", CategoryRoute);
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