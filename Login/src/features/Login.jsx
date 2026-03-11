import { RiFacebookBoxFill, RiGithubFill, RiGoogleFill, RiLockFill, RiUserFill } from "@remixicon/react";
import "../features/style/style.scss"

const Login = () => {
    return (
        <div className="container">
            <div className="form-box login">
                <form action="">
                    <h1>Login</h1>
                    <div className="input-box">
                        <input type="text" placeholder="username" required />
                        <RiUserFill className="icon"/>
                    </div>
                    <div className="input-box">
                        <input type="password" placeholder="password" required />
                        <RiLockFill className="icon"/>
                    </div>
                    <div className="forgot-password">
                        <a href="#">Forgot Password</a>
                    </div>
                    <button type='submit'>Login</button>
                    <p>or login with social platform</p>
                    <div className="social icons">
                        <a href="#"><RiGoogleFill /> </a>
                        <a href="#"><RiFacebookBoxFill /></a>
                        <a href="#"><RiGithubFill /></a>
                    </div>

                </form>
            </div>

        </div>
    )
}

export default Login