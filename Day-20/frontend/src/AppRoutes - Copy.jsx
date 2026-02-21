import { BrowserRouter, Routes, Route } from 'react-router'
import Register from './features/auth/pages/Register'
import Signin from './features/auth/pages/Signin'

function AppRoutes() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path='/' element={<h1>Welcome to the App</h1>} />
                <Route path="/signin" element={<Signin />} />
                <Route path="/register" element={<Register />} />
            </Routes>
        </BrowserRouter>
    )
}

export default AppRoutes
