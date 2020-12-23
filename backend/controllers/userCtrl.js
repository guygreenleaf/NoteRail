const Users = require("../models/userModel")
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const sendMail = require('./sendMail')

const {CLIENT_URL} = process.env
const userCtrl = {
    register: async (req, res) => {
        try{
            const {name, email, password} = req.body
            console.log({name, email, password})
            if(!name || !email || !password){
                return res.status(400).json({msg: "Please fill in all fields."})
            }

            if(!validateEmail(email)){
                return res.status(400).json({msg: "Please provide a valid email."})
            }

            const user = await Users.findOne({email})
            if(user) return res.status(400).json({msg: "This email already exists."})

            if(password.length < 6){
                return res.status(400).json({msg: "Password must be more than 6 characters."})
            }

            const passwordHash = await bcrypt.hash(password, 12)
       

            const newUser = {
                name, email, password: passwordHash
            }

           const activation_token = createActivationToken(newUser)
           const url = `${CLIENT_URL}/user/activate${activation_token}`
           sendMail(email, url)
            

            res.json({msg: "Registration successful. Please check your email for a link to activate your account."})
        } catch (err){
            return res.status(500).json({msg: err.message})
        }
    },
    activateEmail: async (req, res) => {
        try {
            const {activation_token} = req.body
            const user = jwt.verify(activation_token, process.env.ACTIVATION_TOKEN_SECRET)

            console.log(user)
            const {name, email, password} = user

            const check = await Users.findOne({email})
            if(check) return res.status(400).json({msg:"This email already exists."})

            const newUser = new Users({
                name, email, password
            })

            await newUser.save()

            res.json({msg: "Account has been activated."})
        } catch (err) {
            return res.status(500).json({msg: err.message})
        }
    },
    login: async(req, res) => {
        try {
            const {email, password} = req.body
            const user = await Users.findOne({email})
            if(!user) return res.status(400).json({msg: "This email does not exist."})

            const isMatch = await bcrypt.compare(password, user.password)
            if(!isMatch) return res.status(400).json({msg: "Incorrect password. Please try again."})

            console.log(user)
            const refresh_token = createRefreshToken({id: user._id})

            res.json({msg: "Login successful"})
        } catch (error) {
            return res.status(500).json({msg: err.message})
        }
    }
}




function validateEmail(email) {
    const re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
  }
  
const createActivationToken = (payload) => {
    return jwt.sign(payload, process.env.ACTIVATION_TOKEN_SECRET, {expiresIn: '5m'})
}

const createAccessToken = (payload) => {
    return jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET, {expiresIn: '15m'})
}

const createRefreshToken = (payload) => {
    return jwt.sign(payload, process.env.REFRESH_TOKEN_SECRET, {expiresIn: '7d'})
}
module.exports = userCtrl