import React from 'react';
import './App.css';
import Login from './pages/Auth/Login'; 
import SignUp from './pages/Auth/SignUp'; 
import Navbar from './components/Navbar'; 
import Footer from './components/Footer'; 
import Landing from './pages/Landing/Landing'; 

function App() {
  return (
    <div className="App">
      {/* <Navbar /> */}
      {/* <Login /> */}
      {/* <SignUp /> */}
      {/* <Footer /> */}
      <Landing />
    </div>
  );
}

export default App;
