import '../auth/style/form.scss'
import { Link } from 'react-router'
const Login = () => {

    const handleSubmit = (e) => {
        e.preventDefault()
    }

    return (
        <main>
            <div className='form-container'>
                <h1>Login</h1>
                <form onSubmit={handleSubmit}>
                    <input type="username" name='username' id='username' placeholder='Enter Username' />
                    <input type="text" name='password' id='password' placeholder='Enter Password' />
                    <button className='button primary-button'>Login</button>


                </form>
                <p>Don't have an Account? <Link className='link' to={"/register"}>Create Account.</Link></p>
            </div>
        </main>
    )
}

export default Login