import {createBrowserRouter} from 'react-router'
import Login from './features/pages/Login'
import Register from './features/pages/Register'

export const router = createBrowserRouter([
   {
    path: "/login",
    element: <Login />
   },
   {
    path: "/register",
    element: <Register />
   },
   {
      path: "/",
      element: <h1>Welcome to 4 Layes Of Architecure React </h1>
   }
   
    
])