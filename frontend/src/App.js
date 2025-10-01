// import logo from './logo.svg';
import React from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Student from './Student';
import CreateStudent from './CreateStudent';


function App() {
  return (
    <div className="App">

      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Student/>} ></Route>
          <Route path="/create" element={<CreateStudent/>} ></Route> 
        </Routes>
      </BrowserRouter>
      
    </div>
  );
}

export default App;
