import '../node_modules/bootstrap/dist/css/bootstrap.rtl.min.css';
import '../node_modules/bootstrap/dist/js/bootstrap.bundle.min.js';
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";
import Navbar from './components/Navbar';
import Home from './components/Home';
// import './App.css';
import About from './components/About';
import NoteState from './context/notes/NoteState';
import Signup from './components/Signup';
import Login from './components/Login';
import Alert from './components/Alert';
import { useState } from 'react';

function App() {
  const [alert, setalert] = useState(null);

  // copied from the textuitils application
  const showmsg=(message,type)=>{                  //comparator
    setalert({
    msg:message,                                   // message and type are objects
    type:type
    })
    setTimeout(()=>{                               //automatic disapperance of the alert
      setalert(null)
    },2000);
  }

  return (
    <>
    <NoteState>
    <Router>
    <div className="App">
      <Navbar/>
      <Alert alert={alert}></Alert>
      <div className="container">
      <Routes>
      <Route path='/' element={<Home showmsg={showmsg}/>} />
      <Route path='/about' element={<About/>} />
      <Route path='/login' element={<Login showmsg={showmsg}/>} />
      <Route path='/signup' element={<Signup showmsg={showmsg}/>} />
      </Routes>
      </div>
    </div>
    </Router>
    </NoteState>
    </>
  );
}

export default App;
