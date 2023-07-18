import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Signup.css";

const Signup = (props) => {
  const [credential, setCredential] = useState({
    name: "",
    email: "",
    password: "",
    cpassword: "",
  });
  let navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { name, email, password } = credential;
    const response = await fetch("https://cloudnotebook-u1qy.onrender.com/api/auth/createuser", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name,
        email,
        password,
      }),
    });
    const json = await response.json();
    console.log(json);
    if (json.status === "success") {
      localStorage.setItem("token", json.authtoken);
      navigate("/");
      props.showalert("Sucessfully Signed up", "success");
    } else {
      props.showalert("Invalid Credentials", "danger");
    }
  };

  const onChange = (e) => {
    setCredential({ ...credential, [e.target.name]: e.target.value });
  };

  return (
    <div className="signup">
      <form className="signupbox" onSubmit={handleSubmit}>
        <h1 className="signup-title">Sign Up</h1>
        <div className="signup-inputcontainer">
          <label htmlFor="name" className="inp-component">
            <input
              placeholder="Name"
              className="signup-input"
              id="name"
              onChange={onChange}
              name="name"
              type="text"
            />
          </label>
          <label htmlFor="email" className="inp-component">
            <input
              placeholder="Email"
              name="email"
              className="signup-input"
              onChange={onChange}
              id="email"
              type="Email"
            />
          </label>
          <label htmlFor="password" className="inp-component">
            <input
              placeholder="Password"
              className="signup-input"
              name="password"
              minLength={3}
              required
              onChange={onChange}
              id="password"
              type="password"
            />
          </label>
          <label htmlFor="cpassword" className="inp-component">
            <input
              placeholder="Confirm Password"
              className="signup-input"
              name="cpassword"
              onChange={onChange}
              id="cpassword"
              type="password"
            />
          </label>
        </div>
        <p className="signup-desc">
  Already a member? <Link to="/login" style={{ color: 'red' }}>Log in</Link>{' '}
</p>

        <button type="submit" className="signup-btn">
          Sign up
        </button>
      </form>
    </div>
  );
};

export default Signup;
