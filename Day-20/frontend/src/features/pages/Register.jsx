import { Link } from 'react-router'
import '../auth/style/form.scss'

const Register = () => {
  const handleSubmit = (e) =>{
    e.preventDefault()
  }
  return (
    <main>
      <div className='form-container'>
        <h1>Register</h1>
        <form onSubmit={handleSubmit}>
          <input type="text" name='username' id='username' placeholder='Enter Username' />
          <input type="email" name='email' id='email' placeholder='Enter email' />
          <input type="password" name='password' placeholder='Enter Password' />
          <button className='button primary-button'>Register</button>
        </form>
        <p>Already have an account ? <Link className='link' to={"/login"}>Login to Account.</Link></p>
      </div>
    </main>
  )
}

export default Register