import React, { useState } from 'react';
import './Featured.scss';
import { useNavigate } from 'react-router-dom';
const Featured = () => {
  const [input, setInput] = useState('');
  const navigate = useNavigate();
  const handleClick = () => {
    navigate(`/gigs?search=${input}`);
  };
  return (
    <div className="featured">
      <div className="container bg">
        <h1>
          Find the perfect <i>freelance</i>
          <br /> services for your business
        </h1>
        <div className="search">
          <div className="searchInput">
            <img src="./img/search.png" alt="" />
            <input
              type="text"
              placeholder='Try "building mobile app"'
              name=""
              id=""
              onChange={(e) => setInput(e.target.value)}
            />
          </div>
          <button onClick={handleClick}>Search</button>
        </div>
        <div className="popular">
          <span>Popular:</span>
          <button>Web Design</button>
          <button>Wordpress</button>
          <button>Logo Design</button>
          <button>Ai Services</button>
        </div>
      </div>
    </div>
  );
};

export default Featured;
