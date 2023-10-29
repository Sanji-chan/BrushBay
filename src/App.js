import React from 'react';
import './App.css';
import Login from './pages/Auth/Login'; 
import SignUp from './pages/Auth/SignUp'; 
import Navbar from './components/Navbar'; 
import Footer from './components/Footer'; 

function App() {
  return (
    <div className="App">
      {/* <Navbar /> */}
      {/* <Login /> */}
      <SignUp />
      {/* <Footer /> */}
    </div>
  );
}

export default App;
