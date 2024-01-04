const express = require('express');
const productRoute = express.Router();
const productModel = require('../mongo/productModel')
const jwt=require('jsonwebtoken')
const jwtKey='e-com'
productRoute.post('/item', async function (req, res) {
    try {
        const product = new productModel({
            name: req.body.name,
            company: req.body.company,
            price: req.body.price,
            user_id: req.body.user_id,
            category: req.body.category,
        })
        await product.save()
        res.status(200).json({ message: "Product Added" })
    } catch {
        res.status(201).json({ message: "Something wrong" })
    }
})

productRoute.get('/getproducts',verifyToken, async function (req, res) {
    await productModel.find().then((result, err) => {
        if (result) {
            res.status(200).json({ message: "Product found", result: result })
        } else {
            res.status(201).json({ message: "product not found", result: null })
        }
    })
})

productRoute.delete('/deleteproduct/:id', async function (req, res) {
    const result = await productModel.deleteOne({ _id: req.params.id })
    res.send(result)
})

productRoute.post('/editproduct/:id',async function(req,res){
    try{
        const result=await productModel.findOneAndUpdate({_id:req.params.id},{
            name:req.body.name,
            category:req.body.category,
            price:req.body.price,
            company:req.body.company
        },{new:true})
        res.status(200).json({message:"success",result:result})
    }catch{
        res.status(201).json({message:"failed"})
    }
})

productRoute.get('/search/:key',async function(req,res){
   const result= await productModel.find({
        '$or':[
            {name:{$regex:req.params.key}},
            {company:{$regex:req.params.key}},
            {category:{$regex:req.params.key}},
            {price:{$regex:req.params.key}},
        ]
    })
    res.send(result)
})

function verifyToken(req,res,next){
    let tokengHeaders=req.headers['autherization']
    if(tokengHeaders){
        tokengHeaders=tokengHeaders.split(' ')[1]
        jwt.verify(tokengHeaders,jwtKey,(err,token)=>{
            if(err){
                res.status(401).json({message:"please provide valid token"})
            }else{
                next();
            }
        })
    }else{
        res.status(401).json({message:'plese provide jwtToken'})
    }
}
module.exports = productRoute;