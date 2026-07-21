import React, { useState } from 'react'
import'./login.css'
import { useNavigate } from 'react-router-dom'
import api from '../../apicontroller/apiCenter'
import axios from 'axios'

function Signup() {
  const navigate = useNavigate()
    const [show,setShow] = useState(false)
    const[form,setform] = useState({
        userName:"",
        email:"",
        password:""
    })
        const[errorForm,setErrorForm] = useState({
        userName:"",
        email:"",
        password:""
    })

   const handlingForm = (event)=>{
      setform({...form,[event.target.name]:event.target.value})
   }


 const Validator = ()=>{
   console.log('reachhed here ')
  const errorcatch = {}
  const emailFormat = /^\S+@\S+\.\S+$/;
  const username = /^[a-zA-Z]+@[0-9]+$/;
  const lengthCheck = /^.{8,}$/;
  const upperCaseCheck = /[A-Z]/;
  const lowerCaseCheck = /[a-z]/;
  const numberCheck = /[0-9]/;
  const specialCharCheck = /[@$!%*?&#]/;

  if(!form.userName){
    errorcatch.userName = "user name is required"
  }
  else if (form.userName.trim() === ''){
   errorcatch.userName = 'invaild userName' 
  }else if(!username.test(form.userName)){
    errorcatch.userName = "username format : user@903 !"
  }
  if(!form.email){
    errorcatch.email = 'Email is required'
  } else if (!emailFormat.test(form.email)){
    errorcatch.email = "Email is invalid"
  }

  if(!form.password){
    errorcatch.password = 'password is required'
  }
  else if (!lengthCheck.test(form.password)){

    errorcatch.password = 'password minimum 8 characters'
  }else if(!upperCaseCheck.test(form.password)){
    errorcatch.password = 'password must conatin 1 uppercase'
  }else if(!lowerCaseCheck.test(form.password)){
    errorcatch.password = "password must contain 1 lowercase"
  }else if(!numberCheck.test(form.password)){
    errorcatch.password = 'password must conatin 1 number'
  }else if (!specialCharCheck.test(form.password)){
   errorcatch.password = 'password must contain 1 specialchar'
  }
  
 setErrorForm(errorcatch)
 return Object.keys(errorcatch).length === 0 
 }

  const handlingSubmit = async ()=>{
 

try {
  if (Validator()){
    const respons = await axios.post('http://localhost:9999/api/singup',{...form})
   if(respons.data){

     localStorage.setItem('token',respons.data.token)
     localStorage.setItem('refreshToken',respons.data.refreshToken)
     navigate('/home')

   }else{
    console.log('error')
   }
 
}
  
} catch (error) {
  console.log(error?.message)
}
 }
 const handlinglogin = ()=>{
  navigate('/login')
 }
  return (
       <div className='loginMainBox'>
  <div  className='loginCardBox'>
   
    <div className='loginHead'>Sign Up</div>

    <input className='input-2' name='userName' value={form.userName} onChange={handlingForm} type="text" placeholder='username@123' />
   {errorForm.userName && <h4>{errorForm.userName}</h4>}

    <input 
    className='input-2'
     name='email' 
     value={form.email} 
     onChange={handlingForm}
      type="email" 
      placeholder='Email'/>
      {errorForm.email && <h4>{errorForm.email}</h4> }

    <div>
      <input className='input-3' name="password" value={form.password} onChange={handlingForm} type={show  ? "text" : "password"} placeholder='Password' />
    <button className='btn-1' onClick={()=>setShow(!show)} type='button' >{show ? 'hide':'show'}</button>
     
      </div>
     {errorForm.password && <h4>{errorForm?.password}</h4>}
     <div><p>already have account ? <button className='link-btn' onClick={handlinglogin}>login</button></p></div>
    <button onClick={handlingSubmit}>Sumit</button>
  </div>

    </div>
  )
}

export default Signup