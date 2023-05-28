const express = require("express")
const Router = express.Router();
const bcrypt = require("bcrypt")
const Post=require("../routes/posts")
const User = require("../models/user")

//Update
Router.put("/:id", async (req, res) => {
    
    if(req.body.userId===req.params.id){
        if(req.body.password){
            const salt= await bcrypt.genSalt(10);
            req.body.password=await bcrypt.hash(req.body.password,salt);
        }
        try {
          
            const updatesUser=await User.findByIdAndUpdate(req.params.id,
            {
                $set:req.body
            },
            {new:true}
            )
            res.status(200).json(updatesUser)
        }    
        catch (err) {
            res.status(500).json(err)
        }
    }
    else{
        res.status(401).json("you are not authorized person");
    }
})

//delete
Router.delete("/:id", async (req, res) => {
    if (req.body.userId === req.params.id) {
      try {
        // await Post.deleteMany({ username: req.body.username }); // Delete all posts by the user
        const deletedUser = await User.findByIdAndDelete(req.params.id); // Delete the user
        res.status(200).json(deletedUser);
      } catch (err) {
        res.status(500).json({ error: err});
      }
    } else {
      res.status(401).json({ error: "You are not authorized." });
    }
  });


  //Get
  Router.get("/:id",async (req,res)=>{
    if(req.body.userId===req.params.id){
        try{
            const user =await User.findById(req.body.userId)
            const {password ,...others}=user._doc
            res.status(200).json(others)
        }catch(err){
            res.status(401).json(err)
        }
    }else {
        res.status(500).json(err);
      }
  })
module.exports = Router