const express = require("express");
const app = express()
app.use(express.json());
const port = 3001;
app.get("/fakeapi",(req,res,next)=>{
    res.send("Hello World from fake server");
});
app.post("/bogusApi",(req,res,next)=>{
    res.send("Hello World from Bogus server");
});
app.listen(port,()=>{
    console.log("my gateway got started in port 3001");
})