import React, { useEffect, useState } from 'react'
import api from '../../apicontroller/apiCenter'
import { useNavigate } from 'react-router-dom'

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
<div className='loginMainBox'>
    <div className='loginCardBox'>
    <h3>{data?.userName}</h3>
    <h3>{data?.email}</h3>
    
     <button type='button' onClick={handlinglogout}> logout</button>
    </div>
</div>
  )
}

export default Home