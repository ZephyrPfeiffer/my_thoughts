const Thought = require('../models/Thought')

module.exports = {
    getIndex: (req,res)=>{
        res.render('index.ejs')
    },
    getThoughts: async (req,res)=>{
      const thoughts = await Thought.find({createdBy:req.user.id})
      res.render('thoughts.ejs', {thoughts, user: req.user})
  }
}