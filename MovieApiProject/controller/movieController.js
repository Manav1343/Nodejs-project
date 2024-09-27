const User = require("../model/movieModel");
const path = require('path');
const fs = require('fs')

exports.store = async (req, res) => {
  try {
    const { moviename, moviedate, moviediscription } = req.body;
    console.log(req.file);
    const movieapi = await User.create({
      moviename,
      moviedate,
      movieposter: req?.file?.filename,
      moviediscription,
    });
    if (movieapi) {
      //  res.status(200).json("data inserted")
      res.redirect("/show");
    } else {
      res.status(201).json("something wrong");
    }
  } catch (error) {
    console.log(error);
  }
};

exports.trash= async (req,res)=>{
 try {
   const id = req.params.id;
   const movieapi = await User.findByIdAndDelete(id)
   if(movieapi){
    res.redirect("/show");
   }else{
     res.status(301).json("id not found")
   }
 } catch (error) {
  console.log(error);
 }
};
