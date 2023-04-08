import { useQuery } from '@tanstack/react-query';
import React from 'react';
import { Link } from 'react-router-dom';
import newRequest from '../../utils/newRequest';
import './GigCard.scss';
const GigCard = ({ item }) => {
  const { isLoading, error, data } = useQuery({
    queryKey: [item.userID],
    queryFn: () =>
      newRequest.get(`/users/${item.userID}`).then((res) => {
        return res.data;
      }),
  });
  return (
    <div className="link">
      <div className="gigCard">
        <Link to={`/gig/${item._id}`}>
          <img src={item.cover} alt="" />
        </Link>
        <div className="info">
          {isLoading ? (
            'loading'
          ) : error ? (
            'Someting went wrong...'
          ) : (
            <Link to="?search=" className="user">
              <img
                src={
                  data.img ||
                  'https://www.brightlands.com/sites/default/files/2019-12/No%20avater.jpg'
                }
                alt=""
              />
              <span>{data.username}</span>
            </Link>
          )}
          <Link to={`/gig/${item._id}`}>
            <p className="desc">{item.title}</p>
          </Link>
          <div className="star">
            <img src="./img/star.png" alt="" />
            <span>
              {!isNaN(item.totalStars / item.starNumber) &&
                Math.round(item.totalStars / item.starNumber)}
            </span>
          </div>
        </div>
        <hr />
        <div className="detail">
          <img src="./img/heart.png" alt="" />
          <div className="price">
            <span>STARTING AT </span>$ {item.price}
          </div>
        </div>
      </div>
    </div>
  );
};

export default GigCard;
