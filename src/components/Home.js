import React, {useContext} from 'react'
import noteContext from '../context/notes/noteContext'
import Notes from './Notes';


export const Home = (props) => {
  const {showmsg}=props;
  return (
   <>
   <Notes showmsg={showmsg}/>
   </>
  )
}

export default Home
