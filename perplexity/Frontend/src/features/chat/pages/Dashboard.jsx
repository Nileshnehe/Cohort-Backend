import React from 'react'
import { useSelector } from "react-redux"
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router'
import { setUser } from '../../auth/auth.slice'
import { useChat } from '../hooks/useChat'
import { useEffect } from 'react'

const Dashboard = () => {
  
  const chat = useChat()

  const { user } = useSelector(state => state.auth)

  console.log(user);
  
  useEffect(() => {
    chat.initializeSocketConnection()
  }, [])
  

  const dispatch = useDispatch()
  const navigate = useNavigate()

  const handleLogout = () => {
    dispatch(setUser(null))
    navigate('/login')
  }

  return (
    <div className='min-h-screen bg-amber-50'>
    <div className='flex justify-between items-center  px-5 py-2 bg-gray-900'>
      <h1 className='text-white text-xl font-semibold'
      >
        Dashboard
      </h1>
      <button onClick={handleLogout}
      className='bg-red-500 hover:bg-red-600 text-white px-4 py-1 rounded-lg font-semibold transition-colors cursor-pointer'
      >
        Logout
      </button>
    </div>
</div>
  )
}

export default Dashboard