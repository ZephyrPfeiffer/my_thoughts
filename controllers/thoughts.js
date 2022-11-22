const cloudinary = require("../middleware/cloudinary");
const User = require('../models/User')
const Thought = require('../models/Thought')

module.exports = {
  getThought: async (req,res)=>{
    try{
      const user = await User.findById(req.user.id)
      const thought = await Thought.findById(req.params.id)

      if(user._id.equals(thought.createdBy)) {
        res.render('thought.ejs', {thought: thought, user: req.user})
      }else {
        res.redirect('/mythoughts')
      }
    }catch(err){
      
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

      // array to hold set of tags from request
      let validTags = [];

      // process tags from request if there are any
      if(req.body.tags) {

        validTags = processTags(req.body.tags)

      }

      if(req.file && !req.fileValidationError) {
        // Upload image to cloudinary
        const result = await cloudinary.uploader.upload(req.file.path);

        const today = new Date();

        await Thought.create({
          topic: req.body.topic, 
          bodyText: req.body.bodyText,
          image: result.secure_url,
          cloudinaryId: result.public_id,
          dateCreated: today.getDate()  + "-" + (today.getMonth()+1) + "-" + today.getFullYear(),
          tagList: validTags,
          createdBy: req.user.id,
        })
      }else {

        const today = new Date();

        await Thought.create({
          topic: req.body.topic, 
          bodyText: req.body.bodyText,
          image: null,
          cloudinaryId: null,
          dateCreated: today.getDate()  + "-" + (today.getMonth()+1) + "-" + today.getFullYear(),
          tagList: validTags,
          createdBy: req.user.id,
        })
      }
        res.redirect('/mythoughts')
    }catch(err){
      res.redirect('/mythoughts')
    }
  },
  updateThought: async (req, res)=>{

    let validTags = [];
      
    try{
      if(req.file && !req.fileValidationError) {

        // find thought to update
        const thought = await Thought.findById({_id:req.params.id})

        // delete current image that is on the post if it exists
        await cloudinary.uploader.destroy(thought.cloudinaryId);

        // upload the new post to cloudinary
        const result = await cloudinary.uploader.upload(req.file.path);

        await Thought.findOneAndUpdate({_id:req.params.id},{
          topic: req.body.topic,
          bodyText: req.body.bodyText,
          image: result.secure_url,
          cloudinaryId: result.public_id,
          tagList: validTags,
        })
      }else {
        await Thought.findOneAndUpdate({_id:req.params.id},{
          topic: req.body.topic,
          bodyText: req.body.bodyText,
          tagList: validTags,
        })
      }
      console.log('Thought Updated')
      res.redirect(`/thought/${req.params.id}`)
      }catch(err){
        res.redirect(`/thought/${req.params.id}`)
      }
  },
  deleteThought: async (req, res)=>{
        
    try {
      // find thought to update
      const thought = await Thought.findById({_id:req.params.id})

      // delete current image that is on the post
      await cloudinary.uploader.destroy(thought.cloudinaryId);
    }catch(err) {

    }
      
    try{         
      await Thought.remove({_id: req.params.id})
      res.redirect("/mythoughts");
    }catch(err){
      res.redirect("/mythoughts");
    }
  },

}

function processTags(tags) {

  let validTags = tags.filter(tag => {

    if(tag !== '') {

      return true;

    }

    return false;

  })

  let processedTags = validTags.map(tag => {

    let processedTag = '';

    for(let i = 0; i < tag.length; i++) {

      if(tag[i] !== '#') {

        processedTag += tag[i];

      }

    }

    return processedTag;

  })

  return processedTags;

}