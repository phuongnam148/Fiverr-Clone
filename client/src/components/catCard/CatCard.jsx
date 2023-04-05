import React from 'react';
import './CatCard.scss';
import { Link } from 'react-router-dom';

const CatCard = ({ item }) => {
  return (
    <Link to={`/gigs?category=${item.id}`}>
      <div className="catCard">
        <img src={item.img} />
        <span className="desc">{item.desc}</span>
        <h2 className="title">{item.title}</h2>
      </div>
    </Link>
  );
};

export default CatCard;
