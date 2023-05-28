const express = require("express")
const Router = express.Router();
const bcrypt = require("bcrypt")

const User = require("../models/user")

//registration
Router.post("/register", async (req, res) => {
    try {


        const salt = await bcrypt.genSalt(10);
        const hashedPass = await bcrypt.hash(req.body.password, salt)
        const newUSer = new User({
            username: req.body.username,
            password: hashedPass,
            email: req.body.email,
        })

        const user = await newUSer.save()
        res.status(200).json(user)
    } catch (err) {
        res.status(404).json(err)
    }
})

// Login
Router.post("/login", async (req, res) => {
    try {
        const user = await User.findOne({ username: req.body.username })
        const validate = await bcrypt.compare( req.body.password,user.password)
        
        if(!user || !validate){
            res.status(404).json({ msg: "incorrect credentials" })
        }
        else{
            const { password, ...others } = user._doc
            res.status(200).json(others)
        }
 
    }
    catch (err) {
        console.log(err);
        res.status(500).json({msg:err} )

    }
}
)

module.exports = Router