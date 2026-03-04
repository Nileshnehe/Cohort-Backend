import "../style/register.scss"
import FormGroup from "../components/FormGroup"
import {Link} from "react-router"
const Register = () => {
  return (
    <div className="register-page">
      <div className="form-container">
        <h1>Register</h1>
        <form>

          <FormGroup
            label="username"
            placeholder="Enter your username"
          />

          <FormGroup
            label="email"
            placeholder="Enter your email"
          />

          <FormGroup
            label="password"
            placeholder="Enter your password"
          />

          <button className="button" type="submit">Register</button>

        </form>
        <p>Already have an account? <Link className="link" to="/login">Login here</Link></p>
      </div>
    </div>

  )
}

export default Register 