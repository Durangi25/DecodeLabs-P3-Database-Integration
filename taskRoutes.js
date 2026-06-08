const express = require("express");
const router = express.Router();
const Task = require("../models/Task");

router.get("/", async (req,res) => {

 const tasks = await Task.find();

 res.json(tasks);
});

router.get("/:id", async (req,res) => {

 const task = await Task.findById(req.params.id);

 if(!task){
   return res.status(404).json({
     message:"Task not found"
   });
 }

 res.json(task);
});

router.post("/", async (req,res) => {

 const {title,description,status} = req.body;

 if(!title || !description){
   return res.status(400).json({
      message:"Title and Description required"
   });
 }

 const task = await Task.create({
   title,
   description,
   status
 });

 res.status(201).json(task);
});

router.put("/:id", async (req,res) => {

 const task = await Task.findByIdAndUpdate(
   req.params.id,
   req.body,
   {new:true}
 );

 res.json(task);
});

router.delete("/:id", async (req,res) => {

 await Task.findByIdAndDelete(req.params.id);

 res.json({
   message:"Task deleted successfully"
 });
});

module.exports = router;