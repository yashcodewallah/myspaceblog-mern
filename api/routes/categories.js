const express = require("express")
const Category = require("../models/category")
const Router = express.Router()


//create new category
Router.post("/", async (req, res) => {
    const category = new Category(req.body);
    try {
        const savedCat = await category.save()
        res.status(200).json(savedCat)
    } catch (err) {
        res.status(500).json(err)
    }
})

//update 
Router.get("/", async (req, res) => {
    try {
        const allCat = await Category.find();
        res.status(200).json(allCat)
    } catch (err) {
        res.status(500).json(err)
    }
})

module.exports=Router