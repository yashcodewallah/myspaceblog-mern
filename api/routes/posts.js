const express = require("express")
const Router = express.Router();
const bcrypt = require("bcrypt")

const Post = require("../models/post")

//create post
Router.post("/", async (req, res) => {
    try {
        const newPost = new Post({
            username: req.body.username,
            title: req.body.title,
            desc: req.body.desc,
            photo: req.body.photo,
            category: req.body.category
        })

        const post = await newPost.save()
        res.status(200).json(post)

    } catch (err) {
        res.status(500).json(err)
    }
})

//update post
Router.put("/:id", async (req, res) => {
    try {
        const post = await Post.findById(req.params.id)
        if (req.body.username === post.username) {
            try {
                const updatedPost =await Post.findByIdAndUpdate(req.params.id, { $set: req.body }, { new: true })
                res.status(200).json(updatedPost)
            } catch (err) {
                res.status(404).json(err)
            }
        }else{
            res.status(401).json("You can update only your post")
        }
    } catch (err) {
        res.status(401).json(err)
    }
})

//delete
Router.delete("/:id", async (req, res) => {
    try {
        const post = await Post.findById(req.params.id)
        if (req.body.username === post.username) {
            try {
                const updatedPost =await Post.findByIdAndDelete(req.params.id)
                res.status(200).json("post has been deleted")
            } catch (err) {
                res.status(500).json(err)
            }
        }else{
            res.status(401).json("You can delete only your post")
        }
    } catch (err) {
        res.status(500).json(err)
    }
})

//get post

Router.get("/:id",async (req,res)=>{
    try{
        const post=await Post.findById(req.params.id)
        if(post){
            // const {password ,...others}=post._doc
            res.status(200).json(post)
        }else{
            res.status(401).json("post doesnt exist")
        }    
        }catch(err){
            res.status(401).json(err)
        }
    })


    //Get all posts

    Router.get("/",async (req,res)=>{
        const username=req.query.user;
        const catName=req.query.cat;
        try{
            let posts;
            if(username){
                posts=await Post.find({username});
            }else if(catName){
                posts=await Post.find({
                    categories:{
                        $in:[catName],
                    },
                });
            }else{
                posts=await Post.find();
            }
            res.status(200).json(posts)
        }catch(err){
            res.status(500).json("err");
        }
    })


module.exports = Router