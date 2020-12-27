const Users = require("../models/userModel")
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const sendMail = require('./sendMail')


const {CLIENT_URL} = process.env
const userCtrl = {
    register: async (req, res) => {
        try{
            const {name, email, password} = req.body
            if(!name || !email || !password){
                return res.status(400).json({msg: "Please fill in all fields."})
            }

            if(!validateEmail(email)){
                return res.status(400).json({msg: "Please provide a valid email."})
            }

            const user = await Users.findOne({email})
            if(user) return res.status(400).json({msg: "This email already exists."})

            const user2 = await Users.findOne({name})
            if(user2) return res.status(400).json({msg:"This username already exists."})

            if(password.length < 6){
                return res.status(400).json({msg: "Password must be more than 6 characters."})
            }

            const passwordHash = await bcrypt.hash(password, 12)
       

            const newUser = {
                name, email, password: passwordHash
            }

           const activation_token = createActivationToken(newUser)
           const url = `${CLIENT_URL}/user/activate${activation_token}`
           sendMail(email, url, "Verify your email address")
            
            console.log("Registration successful!")
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

            const payload = {id: user._id, name: user.name}
            const token = jwt.sign(payload, process.env.TOKEN_SECRET, {expiresIn: "1d"})
            
            // const refresh_token = createRefreshToken({id: user._id})
            // res.cookie('refreshtoken', refresh_token, {
            //     httpOnly: true,
            //     path: '/user/refresh_token',
            //     maxAge: 7*24*60*60*1000 //7 days
            // })

            res.json({msg: "Login successful", token})
        } catch (error) {
            return res.status(500).json({msg: err.message})
        }
    },
    getAccessToken: (req, res) => {
        try {
            const rf_token = req.cookies.refreshtoken
            if(!rf_token) return res.status(400).json({msg: "Please login to continue"})

            jwt.verify(rf_token, process.env.REFRESH_TOKEN_SECRET, (err,user) => {
                if(err) return res.status(400).json({msg: "There was an error with accessing your jwt. This is usually fixed by clearing browser data and logging back in."}) 
                
                const access_token = createAccessToken({id: user.id})
                res.json({access_token})
            })
        } catch (error) {
            return res.status(500).json({msg: err.message})
        }
    },
    forgotPassword: async (req, res) =>{
        try {
            const {email} = req.body
            const user = await Users.findOne({email})
            if(!user) return res.status(500).json({msg: "This email does not exist."})

            const access_token = createAccessToken({id: user._id})
            const url = `${CLIENT_URL}/user/reset/${access_token}`

            sendMail(email, url, "Reset password")
            res.json({msg:"Instructions to access your acount have been sent - please check your email."})
        } catch (error) {
            return res.status(500).json({msg: err.message})
        }
    },
    resetPassword: async (req, res) => {
        try {
            const {password} = req.body 
            console.log(password)
            const passwordHash = await bcrypt.hash(password, 12)

            console.log(req.user)
            await Users.findOneAndUpdate({_id: req.user.id}, {
                password: passwordHash
            })

            res.json({msg: "Password successfully reset."})
        } catch (error) {
            return res.status(500).json({msg: err.message})
        }
    },
    getUserInfor: async(req, res) =>{
        try {
            const user = await Users.findById(req.user.id).select('-password')

            res.json(user)
        } catch (err) {
            return res.status(500).json({msg: err.message})
        }
    },
    getUsersAllInfor: async (req, res) => {
        try {
            const users = await Users.find().select('-password')

            res.json(users)
        } catch (err) {
            return res.status(500).json({msg: err.message})
        }
    },
    logout: async (req, res) => {
        try {
            res.clearCookie('refreshtoken', {path: '/user/refresh_token'})
            return res.json({msg: "Logout successful"})
        } catch (err) {
            return res.status(500).json({msg:err.message})
        }
    },
    updateUser: async (req, res) => {
        try {
            const {name, avatar} = req.body 
            await Users.findOneAndUpdate({_id: req.user.id}, {
                name, avatar
            })

            res.json({msg:"Update successful"})
        } catch (err) {
            return res.status(500).json({msg: err.message})
        }
    },
    updateUsersRole: async (req, res) => {
        try {
            const {role} = req.body 
            await Users.findOneAndUpdate({_id: req.params.id}, {
                role
            })

            res.json({msg:"Update successful"})
        } catch (err) {
            return res.status(500).json({msg: err.message})
        }
    },
    deleteUser: async (req, res) => {
        try {
            await Users.findByIdAndDelete(req.params.id)
            

            res.json({msg:"Account deleted"})
        } catch (err) {
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