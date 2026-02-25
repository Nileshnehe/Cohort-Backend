import '../auth/style/form.scss'
import { Link, useNavigate } from 'react-router'
import { useAuth } from '../auth/hooks/useAuth'
import { useState } from 'react'
import { Navigate } from 'react-router'
const Login = () => {
    const { user, loading, handleLogin } = useAuth()

    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")

    const navigate = useNavigate()

    const handleSubmit = async (e) => {
        e.preventDefault()

        await handleLogin(username, password)

        navigate("/")
    }
      if(loading){
        return (<main>
            <h1>Login......</h1>  
        </main>)
      }

    return (
        <main>
            <div className='form-container'>
                <h1>Login</h1>
                <form onSubmit={handleSubmit}>

                    <input
                        onInput={(e) => { setUsername(e.target.value) }}
                        type="username"
                        name='username'
                        id='username'
                        placeholder='Enter Username'
                    />

                    <input
                        onInput={(e) => { setPassword(e.target.value) }}
                        type="password"
                        name='password'
                        id='password'
                        placeholder='Enter Password'
                    />

                    <button className='button primary-button'>Login</button>


                </form>
                <p>Don't have an Account? <Link className='link' to={"/register"}>Create Account.</Link></p>
            </div>
        </main>
    )
}

export default Login