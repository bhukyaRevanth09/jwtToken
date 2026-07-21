import React from 'react'
import './landing.css'
import { useNavigate } from 'react-router-dom'

function Logsign() {
   const naviagte = useNavigate()

  const handlingLogin = ()=>{
   naviagte('/login')
  }
  const handlingSignup = ()=>{
   naviagte('/signup')
  }
  return (
    <div className='mainBox'>
       <div className='cardBox'>
      
        
          <button className='buttonBox-1' onClick={handlingLogin}>Login</button>
        <button className='buttonBox-2'onClick={handlingSignup}>Sign up</button>
        
       </div>
    </div>
  )
}

export default Logsign