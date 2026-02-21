import { useState } from 'react'
import '../style/Form.css'
import { Link } from 'react-router'
import axios from 'axios'
import { useAuth } from '../hooks/useAuth'

const Signin = () => {

  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")

  const {signin} = useAuth()

  async function handleSubmit(e) {
    e.preventDefault()

    signin(username, password)
    .then(res=>{
      console.log(res);
      
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
            name='usrname'
            placeholder='Enter' />

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