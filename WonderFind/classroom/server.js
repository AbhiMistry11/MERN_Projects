const express = require("express");
const app = express();

const session = require("express-session");

const sessionOptions ={
    secret : "mysupersecretcode",
    resave:false,
    saveUninitialized: true,
};

app.use(session(sessionOptions));

app.get("/register",(req,res)=>{
    let {name}  = req.query;
    console.log(req.session);
    res.send(name);
})

app.listen(3000,()=>{
    console.log("Port is running on 3000")
});