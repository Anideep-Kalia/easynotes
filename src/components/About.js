import React from 'react'
import NoteContext from '../context/notes/noteContext'
import { useEffect } from 'react'
import { useContext } from 'react'

const About = () => {
  const a= useContext(NoteContext)
  useEffect(()=>{
    a.update();
  },[])
  return (
    <>
    <h1>HI THIS IS {a.state.name} from {a.state.class}</h1>
    </>
  )
}

export default About
