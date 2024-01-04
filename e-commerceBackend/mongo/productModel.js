const mongoose=require('mongoose')

const productSchema=new mongoose.Schema({
    name:String,
    company:String,
    price:String,
    user_id:String,
    category:String
})

module.exports= new mongoose.model("product",productSchema);