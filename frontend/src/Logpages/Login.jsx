import React, { useState } from 'react'
import './login.css'
import { useNavigation } from 'react-router-dom'

import { useNavigate } from 'react-router-dom'
import axios from 'axios'

function Login() {
  const navigate = useNavigate()
  const[show,setShow] = useState(false)
   const[form,setForm]= useState({
    email:"",
    password:""
   })
   const navigation = useNavigation()
   const [errorform,setErrorForm] = useState()
    const handlingForm = (e)=>{
      setForm({...form,[e.target.name]:e.target.value})
    }
   

     const Validator = ()=>{
   console.log('reachhed here ')
  const errorcatch = {}
  const emailFormat = /^\S+@\S+\.\S+$/;
  const lengthCheck = /^.{8,}$/;
  const upperCaseCheck = /[A-Z]/;
  const lowerCaseCheck = /[a-z]/;
  const numberCheck = /[0-9]/;
  const specialCharCheck = /[@$!%*?&#]/;


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
  const handlingsumit = async()=>{
 try {
   if( Validator()){
    const res = await axios.post('http://localhost:9999/api/login',{...form})
    if (res){
      console.log(res?.data.message)
      console.log(res?.data.refreshToken)
      localStorage.setItem("token",res?.data.message)
      localStorage.setItem('refreshToken',res?.data.refreshToken)
      navigate('/home')
      
    }
      setForm({
        email:"", 
        password:""
      })
      
  }
 } catch (error) {
  console.log(error)
 }
    }

 const handlingsignup = ()=>{
  navigate('/signup')
 }
  return (

    <div className='loginMainBox'>
  <div  className='loginCardBox'>
   
    <div className='loginHead'>login</div>
     <input name='email' onChange={handlingForm} value={form.email} className='input-2' type="email" placeholder='email'/>
    {errorform?.email && <h4>{errorform.email}</h4>}
    <div><input name='password' onChange={handlingForm} value={form.password} className='input-3' type={show ? 'text':'password'} placeholder='Password' />
    <button type="button" className='btn-1' onClick={()=>setShow(!show)}>{show ? "hide":"show"}</button>
    </div>
     {errorform?.password && <h4>{errorform.password}</h4>}
     <div><p>create account ! <button className='link-btn' onClick={handlingsignup}>Signup</button></p></div>
    <button onClick={handlingsumit}>Sumit</button>
  </div>

    </div>
  )
}

export default Login