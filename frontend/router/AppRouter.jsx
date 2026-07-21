import React from 'react'

import { createBrowserRouter,RouterProvider } from 'react-router-dom'
import Logsign from '../src/Logpages/Logsign'
import Login from '../src/Logpages/Login'
import Signup from '../src/Logpages/Signup'
import Home from '../src/Logpages/Home'
import ErrorPage from '../src/Logpages/ErrorPage'
import Mainlayout from '../layout/Mainlayout'
import Landing from '../src/Logpages/Landing'

function AppRouter() {
 const router = createBrowserRouter([

    {
        path:'/',
        element:<Mainlayout/>,
        children:[
            {
                index:true,
                element:<Landing/>
            },
            {
                path:'select',
                element:<Logsign/>
            },
            {
                path:'login',
                element:<Login/>
            },
            {
                path:'signup',
                element:<Signup/>
            },{
                path:'home',
                element:<Home/>
            }
        ]
    },
    {
        path:'*',
        element:<ErrorPage/>
    }
 ])
 return <RouterProvider router={router} />

}

export default AppRouter