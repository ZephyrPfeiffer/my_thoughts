const cloudinary = require("../middleware/cloudinary");
const Thought = require('../models/Thought')

module.exports = {
    getThought: async (req,res)=>{
        try{
          const thought = await Thought.findById(req.params.id)
          res.render('thought.ejs', {thought: thought, user: req.user})
            // if(req.user.id === thought.createdBy) {
            //     res.render('thought.ejs', {thought: thought, user: req.user})
            // }else {
            //   res.redirect('/mythoughts')
            // }
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

            const today = new Date();

            await Thought.create({
                topic: req.body.topic, 
                bodyText: req.body.bodyText,
                image: result.secure_url,
                cloudinaryId: result.public_id,
                dateCreated: today.getDate()  + "-" + (today.getMonth()+1) + "-" + today.getFullYear(),
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
        try{
            console.log('hello');
            const thought = await Thought.findById({_id:req.params.id})


            await cloudinary.uploader.destroy(thought.cloudinaryId);

            await Thought.remove({_id: req.params.id})

            console.log('Deleted Thought')
            res.redirect("/mythoughts");
        }catch(err){
          res.redirect("/mythoughts");
        }
    }
}    