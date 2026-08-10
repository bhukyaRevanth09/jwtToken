import React, { useEffect, useState } from 'react'
import './home.css'

import api from '../apicontroller/apiCenter'
import { useNavigate } from 'react-router-dom'
import { Outlet } from 'react-router-dom'

import { RiRobot2Fill } from "react-icons/ri";
import { RiHome2Fill } from "react-icons/ri";
import { RiLogoutBoxFill } from "react-icons/ri";


function Home() {
 const navigate = useNavigate()
 const[data,setData] = useState({})
 const[logout,setLogout] = useState()
useEffect(()=>{
    const handlinUserData = async()=>{
    try {
       const res = await api.get('/profile')
       setData(res?.data.message)
       } catch (error) {
        console.log(error)
        setLogout(error?.logout)
       }
  }
  handlinUserData()
},[])

    const handlinglogout = ()=>{
        localStorage.removeItem('refreshToken')
        localStorage.removeItem('token')
        navigate('/login',{replace:true})
    }

    
    
   useEffect(()=>{
     if(logout){
      navigate('/login',{replace:true})
    }
   },[logout])

  return (
<div className='homeMainBox'>
   
      <div className='navigationBox'>
      <div> <button className='nav-button' onClick={()=>navigate('/home/dashboard')}><RiHome2Fill className='icon'/> Home</button> </div>
      <div> <button className='nav-button' onClick={()=>navigate('/home/chatbot')}><RiRobot2Fill className='icon'/>Chatbot</button></div>
      <div>  <button  type='button' onClick={handlinglogout} className='nav-button' > <RiLogoutBoxFill className='icon'/>Logout</button> </div> 

      </div>
      <div className='componentBox'><Outlet/></div>
   
    
     {/* <button type='button' onClick={handlinglogout}> logout</button> */}
  
</div>
  )
}

export default Home