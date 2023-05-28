const Query  = require('../models/query');
const User = require('../models/user');

const Router= require('express').Router();

//put query
Router.post("/:id",async (req,res)=>{
try{
    const user = await User.findById(req.params.id)

    if(req.body.username=== user.username){
     try{
        const newQuery = new Query({
            username: req.body.username,
            name: req.body.name,
            email: req.body.email,
            message: req.body.message
        })
        const query =await newQuery.save()
        res.status(200).json(query)
    }catch(err){}
    }else{
        res.status(401).json({msg:"unauthorized access"})
    }

}catch(err){
res.status(500).json(err)
}
})



module.exports= Router 