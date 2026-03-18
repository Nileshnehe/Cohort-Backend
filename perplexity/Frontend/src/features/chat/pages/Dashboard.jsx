import React from 'react'
import Sidebar from '../components/Sidebar'
import ChatWindow from '../components/ChatWindow'


const Dashboard = () => {

  return (
    <div className='min-h-screen bg-[#212121] text-[#ececec] flex'>
      <Sidebar />
      <ChatWindow />
    </div>
  )
}

export default Dashboard