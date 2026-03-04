import "../style/login.scss";
import FormGroup from "../components/FormGroup";
import { Link } from "react-router";

const Login = () => {
  return (
    <div>
      <div className="login-page">
        <div className="form-container">
          <h1>Login</h1>
          <form>

            <FormGroup
              label="email"
              placeholder="Enter your email"
            />

            <FormGroup
              label="password"
              placeholder="Enter Your password"
            />

            <button className="button" type="submit">Login</button>

          </form>
          <p>Don't have an account yet? <Link className="link" to="/register">Register here</Link></p>
        </div>
      </div>
    </div>
  )
}

export default Login