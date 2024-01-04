const express = require('express')
const userRoute = express.Router()
const userModel = require('../mongo/userModel')
const jwt = require('jsonwebtoken')
const jwtKey = 'e-com';
userRoute.post('/register', async function (req, res) {
    try {
        const user = new userModel({
            name: req.body.name,
            email: req.body.email,
            number: req.body.number,
            password: req.body.password
        })
       let result= await user.save()
       result=result.toObject()
       delete result.password
        jwt.sign({ result }, jwtKey, { expiresIn: '2h' }, (err, token) => {
            if (err) {
                res.status(201).json({ messaage: "Failed" })
            } else {
                res.status(200).json({ message: "Success", result: result, jwt: token })
            }
        })
    } catch {
        res.status(201).json({ message: 'Failed' })
    }
})

userRoute.post('/login', async function (req, res) {
    await userModel.findOne({ email: req.body.email, password: req.body.password }).select('-password').then((result, err) => {
        if (result) {
            jwt.sign({ result }, jwtKey, { expiresIn: '2h' }, (err, token) => {
                if (err) {
                    res.status(201).json({ message: "User not found", result: result })
                } else {
                    res.status(200).json({ message: 'User found', result: result, jwt: token })
                }
            })
        } else {
            res.status(201).json({ message: "User not found", result: result })
        }
    })

})
module.exports = userRoute;