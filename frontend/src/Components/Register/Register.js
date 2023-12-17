import React, { useEffect, useState } from "react";
import "./Register.css";

import log1 from "../../Images/regsiter.png";
import MailOutlineTwoToneIcon from "@mui/icons-material/MailOutlineTwoTone";
import HttpsTwoToneIcon from "@mui/icons-material/HttpsTwoTone";
import { Link, useLocation, useNavigate } from "react-router-dom";
import PersonIcon from "@mui/icons-material/Person";
import AccountBoxIcon from "@mui/icons-material/AccountBox";
import { useDispatch, useSelector } from "react-redux";
import { fetchRegister } from "../../Redux/Slices/User";
import { Alert, Card } from "@mui/material";
import { toast } from "react-toastify";
import Loading from "../Loading/Loading";

const Register = () => {
  const dispatch = useDispatch();
  const users = useSelector((state) => state.user);
  const { loading, message, error } = users;
  const [pic, setPic] = useState(null);
  const location = useLocation();
  const navigate = useNavigate();
  const [registerData, setRegisterData] = useState({
    name: "",
    email: "",
    userType: "employer",
    password: "",
  });

  const registerDataChange = (e) => {
    let name = e.target.name;
    let value = e.target.value;
    setRegisterData({ ...registerData, [name]: value });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    const { name, email, userType, password } = registerData;
    if (!name || !email || !userType || !password) {
      return;
    }
    await dispatch(fetchRegister({ name, email, userType, password, pic }));
  };
  useEffect(() => {
    if (message) {
      toast.success(message);
      setRegisterData({
        name: "",
        email: "",
        userType: "",
        password: "",
      });
      setPic(null);
      navigate("/login");
    }
    // eslint-disable-next-line
  }, [message]);
  useEffect(() => {
    const storedUserInfo = JSON.parse(localStorage.getItem("userDataInfo"));
    if (storedUserInfo) {
      navigate(location.state || "/");
    }
  }, [location.state, navigate]);
  return (
    <>
      <div className="register">
        {/* {showSuccess && (
          <Alert
            severity="success"
            style={{ backgroundColor: "#c2f0c2", width: "300px" }}
          >
            "You successfully login"
          </Alert>
        )} */}
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
        <Card className="register-container">
          <div className="register-content">
            {loading ? (
              <Loading />
            ) : (
              <>
                <div className="profile">
                  <img src={log1} alt="" />
                </div>

                <div className="detail">
                  <form className="register-form" onSubmit={handleSubmit}>
                    <div className="form-group">
                      <span>
                        <PersonIcon />
                      </span>
                      <input
                        type="text"
                        name="name"
                        required
                        placeholder="your name"
                        value={registerData.name}
                        onChange={registerDataChange}
                      />
                    </div>
                    <div className="form-group">
                      <span>
                        <MailOutlineTwoToneIcon />
                      </span>
                      <input
                        type="email"
                        name="email"
                        required
                        placeholder="your email"
                        value={registerData.email}
                        onChange={registerDataChange}
                      />
                    </div>
                    <div className="form-group">
                      <AccountBoxIcon />
                      <input
                        type="file"
                        name="img"
                        accept="image/*"
                        onChange={(e) => setPic(e.target.files[0])}
                      />
                    </div>
                    <div className="form-group">
                      <span>
                        <HttpsTwoToneIcon />
                      </span>
                      <input
                        type="password"
                        name="password"
                        required
                        placeholder="your password"
                        value={registerData.password}
                        onChange={registerDataChange}
                      />
                    </div>
                    <div className="form-group">
                      <label htmlFor="userType">Choose user type : </label>
                      <select
                        id="userType"
                        name="userType"
                        required
                        value={registerData.userType}
                        onChange={registerDataChange}
                      >
                        <option value="employer">Employer</option>
                        <option value="jobSeeker">Jobseeker</option>
                      </select>
                    </div>
                    <button type="submit" className="register-btn">
                      login
                    </button>
                  </form>
                  <div className="account">
                    <span>
                      <Link to="/login"> Already have an account? Login</Link>
                    </span>
                  </div>
                </div>
              </>
            )}
          </div>
        </Card>
      </div>
    </>
  );
};

export default Register;
