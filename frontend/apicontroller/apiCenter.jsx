import axios from 'axios'


 const api = axios.create({
    baseURL:"http://localhost:9999/api",
    headers:{
        "Content-Type":'application/json'
    }
 })

 const getAccessToken =  ()=>{
    try {
        let token = localStorage.getItem('token')
    if(!token) return null

    if(token.startsWith('Bearer ')){
        token = token.replace('Bearer ','')
    }
     return token
    } catch (error) {
        return null
    }
 }

api.interceptors.request.use((request) => {
    const token = getAccessToken()

    if(token){
        request.headers.Authorization =`Bearer ${token}`
    }
    return request
}, (error) => Promise.reject(error)
)





api.interceptors.response.use(
async(Response)=> Response,
async(error)=> {
const originalRequest = error.config;

if(error.response?.status === 401 && !originalRequest._retry){
    console.log('originalREques is ::',originalRequest)
    originalRequest._retry = true;
   try {
     let refreshToken = localStorage.getItem('refreshToken')
    if(!refreshToken){
        throw new Error('no token given !')
       
    } 
     const res = await axios.post('http://localhost:9999/api/refresh',{refreshToken})
    
    const responseToken = res?.data.message.token
    console.log('tokenGET :: ',responseToken)
    if(!responseToken){
        console.log('error  token is not send from server !')
    }

   
    
    localStorage.setItem('token',responseToken)
    originalRequest.headers.Authorization = `Bearer ${responseToken}`
    
    return api(originalRequest)
    
   } catch (error) {
     await Promise.all([
        localStorage.removeItem('token'),
        localStorage.removeItem('refreshToken')
     ])
     return Promise.reject({
        message:'session expired',
        logout:true
     })
   }

}
return Promise.reject(error);
})


export default api