const express = require("express");
const routes = require("./router/routes")
const app = express()
app.use(express.json());
const port = 3000;
app.use("/",routes);
app.listen(port,()=>{
    console.log("my gateway got started in port 3000");
})