import { useQuery } from '@tanstack/react-query';
import React from 'react';
import newRequest from '../../../utils/newRequest';

const Review = ({ review }) => {
  const { isLoading, error, data } = useQuery({
    queryKey: [review.userID],
    queryFn: () =>
      newRequest.get(`/users/${review.userID}`).then((res) => {
        return res.data;
      }),
  });
  return (
    <div className="item">
      {isLoading ? (
        'Loading...'
      ) : error ? (
        `Something wrong: ${error}`
      ) : (
        <div className="user">
          <img
            className="pp"
            src={
              data.img ||
              'https://images.pexels.com/photos/839586/pexels-photo-839586.jpeg?auto=compress&cs=tinysrgb&w=1600'
            }
            alt=""
          />
          <div className="info">
            <span>{data.username}</span>
            <div className="country">
              {/* <img
                src="https://fiverr-dev-res.cloudinary.com/general_assets/flags/1f1fa-1f1f8.png"
                alt=""
              /> */}
              <span>{data.country}</span>
            </div>
          </div>
        </div>
      )}

      <div className="stars">
        {Array(review.star)
          .fill()
          .map((item, index) => (
            <img key={index} src="/img/star.png" alt="" />
          ))}
        <span>{review.star}</span>
      </div>
      <p>{review.desc}</p>
      <div className="helpful cp">
        <span>Helpful?</span>
        <img src="/img/like.png" alt="" />
        <span>Yes</span>
        <img src="/img/dislike.png" alt="" />
        <span>No</span>
      </div>
    </div>
  );
};

export default Review;
