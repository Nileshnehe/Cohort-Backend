import "../style/login.scss";
import { useState } from "react";
import FormGroup from "../components/FormGroup";
import { Link } from "react-router";
import { useAuth } from "../hooks/useAuth";
import { useNavigate } from "react-router";

const Login = () => {

  const { loading, handleLogin } = useAuth();
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      await handleLogin({ email, password });
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div>
      <div className="login-page">
        <div className="form-container">
          <h1>Login</h1>

          <form onSubmit={handleSubmit} autoComplete="off">

            <FormGroup
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              type="email"
              label="email"
              placeholder="Enter your email"
              autoComplete="new-email"
            />

            {/* Password Field with Toggle */}
            <div className="password-wrapper">

              <FormGroup
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                type={showPassword ? "text" : "password"}
                label="password"
                placeholder="Enter Your password"
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
              {loading ? "Logging in..." : "Login"}
            </button>

          </form>

          <p>
            Don't have an account yet?
            <Link className="link" to="/register"> Register here</Link>
          </p>

        </div>
      </div>
    </div>
  );
};

export default Login;