const Thought = require('../models/Thought')

module.exports = {
    getThought: async (req,res)=>{
        try{
            const thoughts = await Thought.find({userId:req.user.id})
            res.render('thoughts.ejs', {thoughts, user: req.user})
        }catch(err){
            console.log(err)
        }
    },
    createThought: async (req, res)=>{
        try{
            await Thought.create({userName: req.user.userName, subject: req.body.subject, thoughtText: req.body.thoughtText, userId: req.user.id})
            console.log('Thought has been added!')
            res.redirect('/thoughts')
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