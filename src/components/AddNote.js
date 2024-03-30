import React, {useContext} from 'react'
import { useState } from 'react';
import noteContext from '../context/notes/noteContext';

const AddNote = (props) => {
    const context = useContext(noteContext);
    const {addNote}=context;

    const[note,setNote]=useState({title:"", description:"",tag:""})

    const handleClick=(e)=>{
        e.preventDefault();               // to stop reloading of page on clicking the button
        addNote(note.title,note.description,note.tag);   //function called by the NoteState
        props.showmsg("Note Added sucessfully","success")
        setNote({title:"", description:"",tag:""})
    };

    const onChange=(e)=>{
        setNote({...note,[e.target.name] : e.target.value})    //this is pretty much the shortcut for using only one function in tow places but if it is too complex fon you then made two functions it's your call
    };


  return (
    // here i am reusing the home webpage 
    <>
    <h2>Add a Note</h2>
    <form>
  <div className="mb-3">
    <label htmlFor="title" className="form-label">Title</label>
    <input type="text" className="form-control" id="title" name='title' aria-describedby="emailHelp" value={note.title} onChange={onChange} minLength={5} required/>
  </div>
  <div className="mb-3">
    <label htmlFor="description" className="form-label">Description</label>
    <input type="text" className="form-control" id="description" name='description' value={note.description} onChange={onChange} minLength={5} required/>
  </div> 
  <div className="mb-3">
    <label htmlFor="tag" className="form-label">Tag</label>
    <input type="text" className="form-control" id="tag" name='tag' value={note.tag} onChange={onChange} />
  </div> 

  <button disabled={note.description.length<5 || note.title.length<5} type="submit" className="btn btn-primary" onClick={handleClick}>Add Note</button>
</form>
</>
  )
}

export default AddNote
