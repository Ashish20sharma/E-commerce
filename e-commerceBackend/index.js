const express=require('express');
const app=express();
const cors=require('cors')
require('./mongo/connectDb')
const userRoute=require('./routes/userRoute')
const productRoute=require('./routes/productRoute')
app.use(cors())
app.use(express.json())
app.use('/user',userRoute)
app.use('/products',productRoute)
app.listen(5000,()=>{
    console.log("Port listening 5000")
})