import React, { useState } from 'react';
import upload from '../../utils/upload';
import newRequest from '../../utils/newRequest';
import { useNavigate } from 'react-router-dom';

import './Register.scss';
const Register = () => {
  const [file, setFile] = useState(null);
  const [user, setUser] = useState({
    username: '',
    email: '',
    password: '',
    cfm_password: '',
    img: '',
    country: '',
    isSeller: false,
    desc: '',
  });
  const navigate = useNavigate();
  const handelChange = (e) => {
    setUser((prev) => {
      return { ...prev, [e.target.name]: e.target.value };
    });
  };

  const handelSeller = (e) => {
    setUser((prev) => {
      return { ...prev, isSeller: e.target.checked };
    });
  };

  const handelSubmit = async (e) => {
    e.preventDefault();
    const url = await upload(file);

    if (user.password !== user.cfm_password)
      return alert("Retype password doesn't match!! ");
    const { cfm_password, ...newUser } = user;
    try {
      await newRequest.post('/auth/register', {
        ...newUser,
        img: url,
      });
      alert('Sign up success!');
      const { username, password } = user;
      const res = await newRequest.post('/auth/login', { username, password });
      localStorage.setItem('currentUser', JSON.stringify(res.data));
      // console.log("ok");
      navigate('/');
    } catch (error) {
      console.log(error);
      if (error.response.status === 500) alert('Email or Username already exists');
    }
  };
  return (
    <div className="register">
      <form onSubmit={handelSubmit}>
        <div className="left">
          <h1>Create a new account</h1>
          <label htmlFor="">Username</label>
          <input
            name="username"
            type="text"
            placeholder="Enter your username"
            onChange={handelChange}
            required
          />
          <label htmlFor="">Email</label>
          <input
            name="email"
            type="email"
            placeholder="Enter your email"
            onChange={handelChange}
            required
          />
          <label htmlFor="">Password</label>
          <input
            name="password"
            type="password"
            onChange={handelChange}
            required
          />
          <label htmlFor="">Retype Password</label>
          <input
            name="cfm_password"
            type="password"
            onChange={handelChange}
            required
          />
          <label htmlFor="">Profile Picture</label>
          <input type="file" onChange={(e) => setFile(e.target.files[0])} />

          <button type="submit" className="hover_btn">
            Register
          </button>
        </div>
        <div className="right">
          <h1>I want to become a seller</h1>
          <div className="toggle">
            <label htmlFor="">Activate the seller account</label>
            <label className="switch">
              <input type="checkbox" onChange={handelSeller} />
              <span className="slider round"></span>
            </label>
          </div>
          <label htmlFor="">Phone Number</label>
          <input
            name="phone"
            type="tel"
            placeholder="+1 234 567 89"
            onChange={handelChange}
            pattern="[0-9]{10}"
            required
          />
          <label htmlFor="">Country</label>
          <input
            name="country"
            type="text"
            placeholder="Usa"
            onChange={handelChange}
            required
          />
          <label htmlFor="">Description</label>
          <textarea
            placeholder="A short description of yourself"
            name="desc"
            id=""
            cols="30"
            rows="10"
            onChange={handelChange}
          ></textarea>
        </div>
      </form>
    </div>
  );
};

export default Register;
