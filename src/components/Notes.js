import React, {useContext, useEffect,useRef,useState} from 'react'
import NoteContext from '../context/notes/noteContext';
import NotesItems from './NotesItems';
import AddNote from './AddNote';
import { useNavigate } from 'react-router-dom'
// import { useState } from 'react';

const Notes = (props) => {                            // it is universal state/props that can be called form anywhere
    const context = useContext(NoteContext);
    let navigate = useNavigate(); 
    const {notes,getNotes,editNote}=context;

    useEffect(()=>{
      if(localStorage.getItem('token')){
        getNotes()
        } 
      else{
        navigate("/login")
         }
    },[])

    const ref=useRef(null)                            // useref is used to give reference to a element like button div etc.. so we can amke commands related to it 
    const refClose=useRef(null)
    const [note,setNote]=useState({id:"", etitle:"",edescription:"",etag:""})

    const updateNote=(currentNote)=>{
      ref.current.click();            // command for the function that when the button is clicked the modal or anyhting opened would be close
      setNote({id:currentNote._id,etitle:currentNote.title,edescription:currentNote.description,etag:currentNote.tag})
    }

    const handleClick=(e)=>{
      console.log("Updating notes....",note)
      editNote(note.id,note.etitle,note.edescription,note.etag);
      refClose.current.click();          // // command for the function that when the button is clicked the modal or anyhting opened would be close
      props.showmsg("Note editted sucessfully","success")
    }

    const onChange=(e)=>{
      setNote({...note,[e.target.name]:e.target.value})
    }

  return (
    <>
    <AddNote showmsg={props.showmsg}/>
 <button ref={ref} type="button" className="btn btn-primary d-none" data-bs-toggle="modal" data-bs-target="#exampleModal"> { /* here we have given 'ref' as reference to the button */}
  Launch demo modal
</button>

<div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div className="modal-dialog">
    <div className="modal-content">
      <div className="modal-header">
        <h1 className="modal-title fs-5" id="exampleModalLabel">Make Changes..</h1>
        {/* <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button> */}
      </div>
      <div className="modal-body">

      <form>
  <div className="mb-3">
    <label htmlFor="title" className="form-label">Title</label>
    <input type="text" className="form-control" id="etitle" name='etitle' aria-describedby="emailHelp" value={note.etitle} onChange={onChange} minLength={5} required/>
  </div>
  <div className="mb-3">
    <label htmlFor="description" className="form-label">Description</label>
    <input type="text" className="form-control" id="edescription" name='edescription' value={note.edescription} onChange={onChange} minLength={5} required />
  </div> 
  <div className="mb-3">
    <label htmlFor="tag" className="form-label">Tag</label>
    <input type="text" className="form-control" id="etag" name='etag' value={note.etag} onChange={onChange} />
  </div> 

</form>

      </div>
      <div className="modal-footer">
        <button ref={refClose} type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
        <button disabled={note.edescription.length<5 || note.etitle.length<5} type="button" onClick={handleClick} className="btn btn-primary">Edit note</button>
      </div>
    </div>
  </div>
</div>

{/*this is the main code for displaying all the data from json file to webpage */}
<div className="row my-3">
  <h2>your notes</h2>
  <div className="container">
  {notes.length===0 && "No notes to display"}
  </div>
  {notes.map((note)=>{      {/*here note is one of the element of the array of data */}
    return <NotesItems key={note._id} updateNote={updateNote} note={note} showmsg={props.showmsg}/>
  })}
</div>
</>
  )
}

export default Notes
