const mongoose=require('mongoose')

const connectDb=()=>{
    mongoose.connect('mongodb://127.0.0.1:27017/E-COMMERCE')
    console.log("connected to mongoodb")
}
connectDb();

module.exports=connectDb;