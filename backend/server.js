const express=require("express");
const bodyParser=require('body-parser')
const cors=require('cors');
const connectDb=require('../backend/config/db');
const userRoute=require('./routes/user.route');

const app=express();

var corsOptions = {
    origin: "http://localhost:3001"
  };
   app.use(cors(corsOptions));
  
 
//Connect db
app.use(express.json());
connectDb();
//server listen for request
app.get('/',(req,res)=>{res.send('Api runnning')});
require("./routes/user.route")(app);
require('./routes/profile.route')(app);
require('./routes/auth.route')(app);
require('./routes/post.route')(app);


const Port=process.env.port || 3000;
app.listen(Port,()=>{
    console.log(`Server running on port ${Port}`);
})
