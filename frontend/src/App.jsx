import { useState } from 'react'

import './App.css'
import AppRouter from '../router/AppRouter'
import Singup from './Logpages/Signup'
import Landing from './Logpages/Landing'
function App() {


  return (
   <div className='mainApp'>
    <AppRouter/>
   </div>
  )
}

export default App
