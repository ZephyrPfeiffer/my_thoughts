const cloudinary = require("../middleware/cloudinary");
const Thought = require('../models/Thought')

module.exports = {
    getThought: async (req,res)=>{
        try{
            const thoughts = await Thought.findById(req.params.id)
            res.render('thought.ejs', {thoughts, user: req.user})
        }catch(err){
            console.log(err)
        }
    },
    createThought: async (req,res)=>{
        try{
            res.render('createthought.ejs')
        }catch(err){
            console.log(err)
        }
    },
    addThought: async (req, res)=>{
        try{
            // Upload image to cloudinary
            const result = await cloudinary.uploader.upload(req.file.path);

            console.log(result);

            await Thought.create({
              topic: req.body.topic, 
              bodyText: req.body.bodyText,
              image: result.secure_URL,
              cloudinaryId: result.public_id,
              dateCreated: Date.now(),
              tagList: req.body.tagList,
              createdBy: req.user.id,
            })

            console.log('Thought has been added!')
            res.redirect('/mythoughts')
        }catch(err){
            console.log(err)
        }
    },
    udpateThought: async (req, res)=>{
        try{
            await Thought.findOneAndUpdate({_id:req.body.todoIdFromJSFile},{
                subject: req.body.subject,
                thoughtText: req.body.thoughtText,
            })
            console.log('Thought Updated')
            res.json('Thought Updated')
        }catch(err){
            console.log(err)
        }
    },
    deleteThought: async (req, res)=>{
        console.log(req.body.todoIdFromJSFile)
        try{
            await Thought.findOneAndDelete({_id:req.body.todoIdFromJSFile})
            console.log('Deleted Thought')
            res.json('Deleted Thought')
        }catch(err){
            console.log(err)
        }
    }
}    