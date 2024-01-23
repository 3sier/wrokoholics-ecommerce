import React, { useState } from "react";
import { useUser } from "../UserContex";
import "./Login.scss";
import { Link, useNavigate } from "react-router-dom";
import IconButton from "@mui/material/IconButton";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";

function Login() {
  const [user, setUser] = useState({ username: "", password: "" });
  const [loginStatus, setLoginStatus] = useState("");
  const { loginUser, setLoginUser } = useUser();
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  async function loginUserAPI(userData) {
    try {
      const response = await fetch("http://localhost:3003/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(userData),
      });

      if (response.ok) {
        const data = await response.json();
        const token = data.access_token;
        const username = user.username;

        if (token) {
          localStorage.setItem("token", token);
          localStorage.setItem("username", username);
          localStorage.setItem("id", data.user._id);
          setLoginUser(user);
        }
        navigate("/");
      } else if (response.status === 401) {
        throw new Error("Usuario o contraseña incorrectos.");
      } else {
        throw new Error(
          "Error en el servidor. Por favor, inténtalo de nuevo más tarde."
        );
      }
    } catch (error) {
      setLoginStatus(error.message);
      throw error;
    }
  }

  async function handleClick(e) {
    e.preventDefault();

    try {
      loginUserAPI(user);
    } catch (error) {}
  }

  function handleInput(e) {
    const { name, value } = e.target;
    setUser((prevUser) => ({
      ...prevUser,
      [name]: value,
    }));
    setLoginStatus("");
  }

  const togglePasswordVisibility = (e) => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <form>
          <h2>Inicia sesión en tu cuenta</h2>
          <div className="input-group">
            <input
              onChange={handleInput}
              type="text"
              name="username"
              placeholder="username"
              className={loginStatus ? "input-error" : ""}
            />
            <div className="password-input-container">
              <input
                onChange={handleInput}
                type={showPassword ? "text" : "password"}
                name="password"
                placeholder="password"
                className={loginStatus ? "input-error" : ""}
              />
              <IconButton
                className="btn-visible"
                onClick={togglePasswordVisibility}
              >
                {showPassword ? <VisibilityOffIcon /> : <VisibilityIcon />}
              </IconButton>
            </div>

            {loginStatus && <p className="error-message">{loginStatus}</p>}
            <button className="btn-login" onClick={handleClick}>
              Log in
            </button>
          </div>
          <div className="register-link">
            ¿No tienes cuenta? <Link to={"/Registro"}>Regístrate</Link>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Login;
