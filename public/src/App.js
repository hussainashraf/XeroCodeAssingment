import React from 'react'
import { BrowserRouter, Route, Routes,Navigate } from "react-router-dom";
import Hosting from './pages/Hosting';
import Login from './pages/Login'
import Register from './pages/Register'
import User from './pages/User'
import Cloud from './pages/User'
import { useCookies } from 'react-cookie';
export default function App() {
  const [cookies] = useCookies([]);
  return (

    <BrowserRouter>
    {/* <h1>HelloWOrld</h1> */}
    
      <Routes>
        <Route path="/signin" element={<Login/>}></Route>
        <Route path="/signup" element={<Register/>}/>
        <Route path="/" element={<User/>}/>
        <Route path="/hosting" element={cookies.jwt ? <Hosting /> : <Navigate to="/signup" />} />
        {/* <Route path="/" /> */}
        <Route path="/cloud" element={<Cloud/>}/>
      </Routes>
    </BrowserRouter>
  )
}
