import "../style/register.scss";
import { useState } from "react";
import FormGroup from "../components/FormGroup";
import { Link } from "react-router";
import { useAuth } from "../hooks/useAuth";
import { useNavigate } from "react-router";

const Register = () => {

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const { loading, handleRegister } = useAuth();
  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      await handleRegister({ username, email, password });
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div className="register-page">
      <div className="form-container">
        <h1>Register</h1>

        <form onSubmit={handleSubmit} autoComplete="off">

          <FormGroup
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            label="username"
            type="text"
            placeholder="Enter your username"
            autoComplete="new-username"
          />

          <FormGroup
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            label="email"
            type="email"
            placeholder="Enter your email"
            autoComplete="new-email"
          />

          <div className="password-wrapper">
            <FormGroup
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              type={showPassword ? "text" : "password"}
              label="password"
              placeholder="Enter your password"
              autoComplete="new-password"
            />

            <button
              type="button"
              className="toggle-btn"
              onClick={() => setShowPassword(prev => !prev)}
            >
              {showPassword ? "Hide" : "Show"}
            </button>
          </div>

          <button className="button" type="submit">
            {loading ? "Registering..." : "Register"}
          </button>

        </form>

        <p>
          Already have an account?
          <Link className="link" to="/login"> Login here</Link>
        </p>
      </div>
    </div>
  );
};

export default Register;