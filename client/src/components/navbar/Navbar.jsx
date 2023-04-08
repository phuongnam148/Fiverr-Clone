import React, { useEffect, useState } from "react";
import "./Navbar.scss";
import { Link, useLocation, useNavigate } from "react-router-dom";
import newRequest from "../../utils/newRequest";
import { category } from "../../data";

const Navbar = () => {
  const [active, setActive] = useState(false);
  const [open, setOpen] = useState(false);

  const { pathname } = useLocation();

  const idActive = () => {
    window.scrollY > 0 ? setActive(true) : setActive(false);
  };
  useEffect(() => {
    window.addEventListener("scroll", idActive);

    return () => {
      window.removeEventListener("scroll", idActive);
    };
  }, []);

  const currentUser = JSON.parse(localStorage.getItem("currentUser"));

  const navigate = useNavigate();

  const handelLogout = async () => {
    try {
      await newRequest.post("/auth/logout");
      localStorage.setItem("currentUser", null);
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className={active || pathname !== "/" ? "navbar active" : "navbar"}>
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
          {!currentUser && <Link to="/login">Sign In</Link>}
          {!currentUser?.isSeller && <span>Become a Seller</span>}
          {!currentUser && (
            <Link to="/register" className="register_btn">
              Join
            </Link>
          )}
          {currentUser && (
            <div className="user" onClick={() => setOpen(!open)}>
              <img
                src={
                  currentUser.img ||
                  "https://www.brightlands.com/sites/default/files/2019-12/No%20avater.jpg"
                }
                alt=""
              />
              <span>{currentUser?.username}</span>
              {open && (
                <div className="options">
                  <Link to="/profile">Profile</Link>
                  {currentUser?.isSeller && (
                    <>
                      <Link to="/mygigs">Gigs</Link>
                      <Link to="/add">Add New Gig</Link>
                    </>
                  )}
                  <Link to="/orders">Orders</Link>
                  <Link to="/messages">Messages</Link>
                  <hr />
                  <Link onClick={handelLogout}>Log Out</Link>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
      {(active || pathname !== "/") && (
        <>
          <hr />
          <div className="menu container">
            {category.map((c) => (
              <Link
                key={c.id}
                className="link menuLink"
                to={`/gigs?category=${c.id}`}
              >
                {c.title}
                <hr />
              </Link>
            ))}
          </div>
          <hr />
        </>
      )}
    </div>
  );
};

export default Navbar;
