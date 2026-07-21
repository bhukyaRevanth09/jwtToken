import React from 'react'
import Singup from '../src/Logpages/Signup'
import { Outlet } from 'react-router-dom'


function Mainlayout() {
  console.log('revanth')
  return (
    <div>
   
    <Outlet/>
      
    </div>
  )
}

export default Mainlayout