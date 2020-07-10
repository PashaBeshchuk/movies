import React from 'react';
import './App.css';
import Films from './components/films/Films';
import Navbar from './components/navbar/Navbar';

function App() {
  return (
    <div>
      <Navbar/>
      <Films/>
    </div>
  );
}

export default App;
