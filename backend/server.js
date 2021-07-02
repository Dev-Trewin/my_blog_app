const express=require("express");
const bodyParser=require('body-parser')
const cors=require('cors');
const connectDb=require('./config/db');
const userRoute=require('./routes/user.route');

const app=express();

 
//Connect db
app.use(express.json());
connectDb();
//server listen for request

require("./routes/user.route")(app);
require('./routes/profile.route')(app);

require('./routes/auth.route')(app);
require('./routes/post.route')(app);


const Port=process.env.port || 3000;
app.listen(Port,()=>{
    console.log(`Server running on port ${Port}`);
})
