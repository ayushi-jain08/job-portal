import React, { useEffect, useState } from "react";
import "./Login.css";
import MailOutlineTwoToneIcon from "@mui/icons-material/MailOutlineTwoTone";
import HttpsTwoToneIcon from "@mui/icons-material/HttpsTwoTone";
import log1 from "../../Images/log.png";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { clearError, fetchLogin } from "../../Redux/Slices/User";
import Alert from "@mui/material/Alert";
import Loading from "../Loading/Loading";

const Login = () => {
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showSuccess, setShowSuccess] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();
  const users = useSelector((state) => state.user);
  const { loading, error } = users;
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email || !password) {
    } else {
      await dispatch(fetchLogin({ email, password }));
      const storedUserInfo = JSON.parse(localStorage.getItem("userDataInfo"));
      if (storedUserInfo) {
        setShowSuccess(true);
        setTimeout(() => {
          navigate(location.state || "/");
        }, 1000);
      }
    }
  };
  useEffect(() => {
    dispatch(clearError());
  }, [dispatch]);
  useEffect(() => {
    const storedUserInfo = JSON.parse(localStorage.getItem("userDataInfo"));
    if (storedUserInfo) {
      navigate(location.state || "/");
    }
  }, [location.state, navigate]);
  return (
    <>
      <div className="login">
        {showSuccess && (
          <Alert
            severity="success"
            style={{ backgroundColor: "#c2f0c2", width: "300px" }}
          >
            "You successfully login"
          </Alert>
        )}
        {error && (
          <Alert
            severity="error"
            style={{
              width: "300px",
              backgroundColor: "#ffcccc",
            }}
          >
            {error}
          </Alert>
        )}
        {loading ? (
          <Loading />
        ) : (
          <div className="login-container">
            <div className="login-content">
              <>
                <div className="profile">
                  <img src={log1} alt="" />
                </div>
                <h2>Login</h2>
                <div className="detail">
                  <form className="login-form" onSubmit={handleSubmit}>
                    <div className="form-group">
                      <span>
                        <MailOutlineTwoToneIcon />
                      </span>
                      <input
                        type="email"
                        placeholder="your email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                      />
                    </div>
                    <div className="form-group">
                      <span>
                        <HttpsTwoToneIcon />
                      </span>
                      <input
                        type="password"
                        placeholder="your password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                      />
                    </div>
                    <button type="submit" className="login-btn">
                      login
                    </button>
                  </form>
                  <div className="account">
                    <span>
                      <Link to="/register"> No account?Register</Link>
                    </span>
                    <br />
                    <span>
                      <Link to="/">
                        <strong style={{ color: "black" }}>
                          Forgot Password?
                        </strong>
                        Click here
                      </Link>
                    </span>
                  </div>
                </div>
              </>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default Login;
