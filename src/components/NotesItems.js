import React, {useContext} from 'react'
import noteContext from '../context/notes/noteContext';

const NotesItems = (props) => {
  const context = useContext(noteContext);
  const {deleteNote}=context;
  
    const {note,updateNote,showmsg}=props;
  return (
    <div className="col-md-3">
     <div className="card my-3">
  <div className="card-body">

    <div className="d-flex align-items-center">
    <h5 className="card-title">{note.title}</h5>
    <i className="fa-solid fa-user-pen mx-2 my-10" onClick={()=>{updateNote(note)}}></i>
    <i className="fa-sharp fa-solid fa-trash"onClick={()=>{deleteNote(note._id); showmsg("Note deleted sucessfully","success")}}></i>
    </div>

    <p className="card-text">{note.description}</p>
  </div>
</div>
    </div>
  )
}

export default NotesItems
