import {createBrowserRouter} from 'react-router'
import Login from './features/pages/Login'
import Register from './features/pages/Register'
import Feed from './features/posts/pages/Feed'

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
      element: <Feed />
   }
   
    
])