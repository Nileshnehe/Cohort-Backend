import { Link, useNavigate } from 'react-router'
import { useAuth } from '../auth/hooks/useAuth'
import '../auth/style/form.scss'
import { useState } from 'react'

const Register = () => {

  const { loading, handleRegister } = useAuth()



  const [username, setUsername] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")


  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()

    await handleRegister(username, email, password)
    navigate("/")
  }

  if (loading) {
    return (<main>
      <h1>Resiter....</h1>
    </main>
    )
  }
  return (
    <main>
      <div className='form-container'>
        <h1>Register</h1>
        <form onSubmit={handleSubmit}>
          <input
            onChange={(e) => { setUsername(e.target.value) }}
            type="text"
            name='username'
            id='username'
            placeholder='Enter Username'
          />

          <input
            onChange={(e) => { setEmail(e.target.value) }}
            type="email"
            name='email'
            id='email'
            placeholder='Enter email'
          />

          <input
            onChange={(e) => { setPassword(e.target.value) }}
            type="password"
            name='password'
            id='password'
            placeholder='Enter Password'
          />

          <button className='button primary-button'>Register</button>
        </form>
        <p>Already have an account ? <Link className='link' to={"/login"}>Login to Account.</Link></p>
      </div>
    </main>
  )
}

export default Register