const express=require('express');
var fetchuser=require('../middleware/fetchuser');
const Note=require('../models/Note');
const router=express.Router();
const { body, validationResult } = require('express-validator');

// Route 1: Getting all notes from the database of user using GET request "api/notes/fetchallnotes"   
//this we are writting so that we can convert all the data in database in json file so we can obatain it easily
router.get('/fetchallnotes',fetchuser,async (req,res)=>{
    try{
        const notes=await Note.find({user:req.user.id});       // here we are fetching all notes of all users so we are not matching user id 
        res.json(notes)
    }catch(error){  console.error(error.message);
        res.status(500).send("some error occured");}
}
)

// Route 2: Add a new notes using :POST "/api/auth/addnote".Login required
router.post("/addnote",fetchuser,[
    body('title','Enter avalid title').isLength({min:3}),
    body('description','Description must be atleast 5 characters').isLength({min:5}),],async(req,res)=>{
        try{

            const{title,description,tag}=req.body;
            // if there are errors, return Bad request and the errors
            const errors=validationResult(req);
            if(!errors.isEmpty()){
                return res.status(400).json({errors:errors.array()});
            }
            // here we are using schema exclusively
            const note=new Note({
                title,description,tag,user:req.user.id
            })
            const savedNotes=await note.save();

            res.json(savedNotes)
        }
    catch(error){  console.error(error.message);
        res.status(500).send("some error occured");}
})

// Route 3: Update an exiting Note using PUT "api/notes/updatenote" login required
router.put('/updatenote/:id',fetchuser,async (req,res)=>{
    try{
    const {title,description,tag}=req.body;

    //creating new note 
    const newNote={};        // all data is stored in this const
    if(title){newNote.title=title};
    if(description){newNote.description=description};
    if(tag){newNote.tag=tag};

    // find the note to be updated adn upadet it
    let note=await Note.findById(req.params.id);          // note is now carrying the id of Note in which original data is stored      
    if(!note){return res.status(404).send("Not Found")}  

    //here we will first convert the user id stored in database from json to string
    if(note.user.toString()!== req.user.id){              // here we are matching id's of user and the note if they are same then only they can proceed
        return res.status(401).send("Not Allowed");
    }

    note=await Note.findByIdAndUpdate(req.params.id,{$set:newNote},{new:true})
    res.json({note});
}    catch(error){  console.error(error.message);
    res.status(500).send("some error occured");}
    
})




// Route 4 : Deleting an exiting Note using DELETE request "api/notes/deletenote" login required
router.delete('/deletenote/:id',fetchuser,async (req,res)=>{
    const{ title,description,tag}=req.body;

    //Find the note to be deleted and delete it
    let note =await Note.findByIdAndDelete(req.params.id);
    if(!note){return res.status(404).send("Not found")}

    // Allow deletion only if suer owns this note
    if(note.user.toString()!==req.user.id){
        return res.status(401).send("Not Allowed");
    }

    note=await Note.findByIdAndDelete(req.params.id)
    res.json({"Success":"Note has been deleted"});
})
module.exports=router;
