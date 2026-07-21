import React from 'react'
import { useNavigate } from 'react-router-dom'

function Landing() {
    const navigate = useNavigate()

    const handlingpage = ()=>{
        
        navigate('/select')
    }
  return (
    <div className='mainBox'>
        <button onClick={handlingpage}>
            Start
        </button>
    </div>
  )
}

export default Landing