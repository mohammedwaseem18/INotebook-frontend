import React,{useState} from 'react'

import './App.css';

import {
  BrowserRouter,
  Routes,
  Route,
  
} from "react-router-dom";
import Navbar from './components/Navbar'
import Home from './components/Home';
import About from './components/About';
import NoteState from './context/notes/NoteState';
import Alert from './components/Alert'
import Login from './components/Login';
import Signup from './components/Signup';



function App() {
  const[alert,setAlert]=useState(null);
  const showalert=(message,type)=>{
    setAlert({
      msg:message,
      type:type
    })
    setTimeout(()=>{
      setAlert(null)
    },2000)
  }

  return (
    <div className="app">

          <NoteState>  
          <BrowserRouter>
        <Navbar/>
        <Alert alert={alert}/>
        <Alert message ='this is waseem react course'/>
        <div className='container'>
      
        <Routes>
     
        
        <Route path="/login" element={<Login showalert={showalert} />}/>
          <Route path="/signup" element={<Signup showalert={showalert}/>}/>
         
         
          <Route exact path="/" element={<Home showalert={showalert} />} />
          <Route  exact path="/about" element={<About />} />
        
        </Routes>
        </div>
      </BrowserRouter>
      </NoteState>  
    </div>
  );
}

export default App;
