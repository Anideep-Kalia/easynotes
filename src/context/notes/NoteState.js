import noteContext from "./noteContext";
import { useState } from "react";

const NoteState=(props)=>{

  const host="http://localhost:5000";

    const notesInitial=[]
      const [notes,setNotes]=useState(notesInitial)

      //these are the functions for our buttons which we imported from the awesome icon and these function will edit my database
      const getNotes=async ()=>{
        const response = await fetch(`${host}/api/notes/fetchallnotes`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'auth-token':localStorage.getItem('token')
          }
        });
        // TODO API CALL
        const json=await response.json()
        console.log(json)
        setNotes(json);
      };

      const addNote=async (title,description,tag)=>{
        //API call
        const response = await fetch(`${host}/api/notes/addnote`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'auth-token':localStorage.getItem('token')
          },
          body: JSON.stringify({title,description,tag})
        });
        // TODO API CALL
        const note=await response.json();
        setNotes(notes.concat(note))
      }

      // DELETE NOTE
      const deleteNote = async (id)=>{
        // API call
        const response = await fetch(`${host}/api/notes/deletenote/${id}`, {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json',
            'auth-token':localStorage.getItem('token')
          }
        });
        const json= response.json();
        console.log(json)

        //TODO API CALL
        console.log("deleting the node with id : " + id);
        const newNotes= notes.filter((note)=>{return note._id !== id})
        setNotes(newNotes)
      }

      const editNote=async (id,title,description,tag)=>{
        //API Call
        const response = await fetch(`${host}/api/notes/updatenote/${id}`, {    // here the data is coming from the given url which is saved in database
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            'auth-token':localStorage.getItem('token')
          },
          body: JSON.stringify({title,description,tag})    // here data is coming in form of string which can be iterated and edited by using loops
        });
        const json= response.json();

        let newNotes=JSON.parse(JSON.stringify(notes))
        // logic in client
        for (let index = 0; index < newNotes.length; index++) {
          const element = newNotes[index];
          if(element._id===id){
            newNotes[index].title=title;
            newNotes[index].description=description;
            newNotes[index].tag=tag;
            break;
          }
        }
        setNotes(newNotes);
      };

    return(
        <noteContext.Provider value={{notes,addNote,deleteNote,editNote,getNotes}}>
            {props.children}
        </noteContext.Provider>
    )
}
export default NoteState; 