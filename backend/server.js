const express=require("express");
const bodyParser=require('body-parser')
const cors=require('cors');

const app=express();

//server listen for request
app.get('/',(req,res)=>{res.send('Api runnning')})
const Port=process.env.port || 3000;
app.listen(Port,()=>{
    console.log(`Server running on port ${Port}`);
})