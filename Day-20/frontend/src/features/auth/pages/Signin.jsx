import { useState } from 'react'
import '../style/Form.css'
import { Link, useNavigate } from 'react-router'
import axios from 'axios'
import { useAuth } from '../hooks/useAuth'


const Signin = () => {

  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")

  const { handleSignin, loading } = useAuth()
  const navigate = useNavigate()

  if (loading) {
    return (<h1>login in progress....</h1>)
  }

  async function handleSubmit(e) {
    e.preventDefault()

    handleSignin(username, password)
      .then(res => {
        console.log(res)
        console.log("login successful")
        navigate("/")
      })


  }
  return (
    <main>
      <div className='form-container'>
        <h1>Login</h1>
        <form onSubmit={handleSubmit}>
          <input
            onInput={(e) => { setUsername(e.target.value) }}
            type="text"
            name='username'
            placeholder='Enter Name' />

          <input
            onInput={(e) => setPassword(e.target.value)}
            type="password"
            name='password'
            placeholder='Enter your password' />

          <button type='submit'>Login</button>
        </form>
        <p>Don't have an account? <Link className='toggleAuthForm' to="/register">Register</Link></p>
      </div>
    </main>
  )
}

export default Signin