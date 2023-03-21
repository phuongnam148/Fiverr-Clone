import React, { useEffect, useState } from 'react';
import './Navbar.scss';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import newRequest from '../../utils/newRequest';
const Navbar = () => {
  const [active, setActive] = useState(false);
  const [open, setOpen] = useState(false);

  const { pathname } = useLocation();

  const idActive = () => {
    window.scrollY > 0 ? setActive(true) : setActive(false);
  };
  useEffect(() => {
    window.addEventListener('scroll', idActive);

    return () => {
      window.removeEventListener('scroll', idActive);
    };
  }, []);

  const currentUser = JSON.parse(localStorage.getItem('currentUser'));

  const navigate = useNavigate();

  const handelLogout = async () => {
    try {
      await newRequest.post('/auth/logout');
      localStorage.setItem('currentUser', null);
      navigate('/');
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className={active || pathname !== '/' ? 'navbar active' : 'navbar'}>
      <div className="container">
        <div className="logo">
          <Link to="/">
            <span className="text">fiverr</span>
            <span className="dot">.</span>
          </Link>
        </div>

        <div className="links">
          <span>Fiverr Business</span>
          <span>Explore</span>
          <span>English</span>
          <Link to="/login">Sign In</Link>
          {!currentUser?.isSeller && <span>Become a Seller</span>}
          {!currentUser && <button>Join</button>}
          {currentUser && (
            <div className="user" onClick={() => setOpen(!open)}>
              <img
                src={
                  currentUser.img ||
                  'https://images.pexels.com/photos/1115697/pexels-photo-1115697.jpeg?auto=compress&cs=tinysrgb&w=1600'
                }
                alt=""
              />
              <span>{currentUser?.username}</span>
              {open && (
                <div className="options">
                  {currentUser?.isSeller && (
                    <>
                      <Link to="/mygigs">Gigs</Link>
                      <Link to="/add">Add New Gig</Link>
                    </>
                  )}
                  <Link to="/orders">Orders</Link>
                  <Link to="/messages">Messages</Link>
                  <Link to="/">Orders</Link>
                  <hr />
                  <Link onClick={handelLogout}>Log Out</Link>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
      {(active || pathname !== '/') && (
        <>
          <hr />
          <div className="menu container">
            <Link className="link menuLink" to="/">
              Graphics & Design
              <hr />
            </Link>
            <Link className="link menuLink" to="/">
              Video & Animation
              <hr />
            </Link>
            <Link className="link menuLink" to="/">
              Writing & Translation
              <hr />
            </Link>
            <Link className="link menuLink" to="/">
              AI Services
              <hr />
            </Link>
            <Link className="link menuLink" to="/">
              Digital Marketing
              <hr />
            </Link>
            <Link className="link menuLink" to="/">
              Music & Audio
              <hr />
            </Link>
            <Link className="link menuLink" to="/">
              Programming & Tech
              <hr />
            </Link>
            <Link className="link menuLink" to="/">
              Business
              <hr />
            </Link>
            <Link className="link menuLink" to="/">
              Lifestyle
              <hr />
            </Link>
          </div>
          <hr />
        </>
      )}
    </div>
  );
};

export default Navbar;
