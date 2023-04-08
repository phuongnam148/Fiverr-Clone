/* eslint-disable react/no-unescaped-entities */
import React from "react";
import "swiper/css";

import "swiper/css/navigation";

import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper";
import "./Gig.scss";
import { useQuery } from "@tanstack/react-query";
import { Link, useNavigate, useParams } from "react-router-dom";
import newRequest from "../../utils/newRequest";
import Reviews from "../../components/reviews/Reviews";
import getCurrentUser from "../../utils/getCurrentUser";
const Gig = () => {
  const navigate = useNavigate();

  const { gigID } = useParams();

  const { isLoading, error, data } = useQuery({
    queryKey: ["gig"],
    queryFn: () =>
      newRequest.get(`/gigs/single/${gigID}`).then((res) => {
        return res.data;
      }),
  });
  const currentUser = getCurrentUser();
  const userId = data?.userID;

  const {
    isLoading: isLoadingUser,
    error: errorUser,
    data: dataUser,
  } = useQuery({
    queryKey: [userId],
    queryFn: () =>
      newRequest.get(`/users/${userId}`).then((res) => {
        return res.data;
      }),
    enabled: !!userId, // ko có user id sẽ ko chạy hàm này
  });

  const handelContinue = () => {
    if (!currentUser) return alert("You must login before order gig");
    if (currentUser?.isSeller) return alert("Seller can't order gig");

    navigate(`/pay/${gigID}`);
  };

  const handelContact = async (sellerID) => {
    if (!currentUser) return alert("You must login before contact seller");
    if (currentUser?.isSeller)
      return alert("Seller can't contact to other seller");

    const buyerID = currentUser._id;
    const id = sellerID + buyerID;

    try {
      const res = await newRequest.get(`/conversations/single/${id}`);
      navigate(`/message/${res.data.id}`);
    } catch (error) {
      if (error.response.status === 404) {
        const res = await newRequest.post(`/conversations`, {
          to: currentUser.isSeller ? buyerID : sellerID,
        });
        navigate(`/message/${res.data.id}`);
      }
    }
  };

  return (
    <div className="gig">
      {isLoading ? (
        "Loading..."
      ) : error ? (
        "Something wrong..."
      ) : (
        <div className="container">
          <div className="left">
            <span className="breadcrumbs">Fiverr / Graphics & Design </span>
            <h1>{data.title}</h1>
            {isLoadingUser ? (
              "Loading..."
            ) : errorUser ? (
              "Something wrong..."
            ) : (
              <div className="user">
                <img
                  className="pp"
                  src={
                    dataUser.img ||
                    "https://www.brightlands.com/sites/default/files/2019-12/No%20avater.jpg"
                  }
                  alt=""
                />
                <span>{dataUser.username}</span>
                {!isNaN(data.totalStars / data.starNumber) && (
                  <div className="stars">
                    {Array(Math.round(data.totalStars / data.starNumber))
                      .fill()
                      .map((item, index) => (
                        <img key={index} src="/img/star.png" alt="" />
                      ))}

                    <span>
                      {Math.round(data.totalStars / (data.starNumber - 1))}
                    </span>
                  </div>
                )}
              </div>
            )}

            <Swiper
              loop={true}
              navigation={true}
              modules={[Navigation]}
              className="slider"
            >
              {data.images &&
                data.images.map((image, index) => (
                  <SwiperSlide key={index}>
                    <img src={image} alt="" />
                  </SwiperSlide>
                ))}
            </Swiper>

            <h2>About This Gig</h2>
            <p>{data.desc}</p>
            {isLoadingUser ? (
              "Loading"
            ) : errorUser ? (
              "Something wrong..."
            ) : (
              <div className="seller">
                <h2>About The Seller</h2>
                {isLoadingUser ? (
                  "Loading..."
                ) : errorUser ? (
                  "Something wrong..."
                ) : (
                  <div className="user">
                    <img
                      className="pp"
                      src={
                        dataUser.img ||
                        "https://www.brightlands.com/sites/default/files/2019-12/No%20avater.jpg"
                      }
                      alt=""
                    />
                    <div className="info">
                      <span>{dataUser.username}</span>
                      <div className="stars">
                        {!isNaN(data.totalStars / data.starNumber) &&
                          Array(Math.round(data.totalStars / data.starNumber))
                            .fill()
                            .map((item, index) => (
                              <img key={index} src="/img/star.png" alt="" />
                            ))}
                        <span>
                          {isNaN(data.totalStars / data.starNumber)
                            ? "0"
                            : Math.round(data.totalStars / data.starNumber)}
                        </span>
                      </div>
                      <button onClick={() => handelContact(dataUser._id)}>
                        Contact Me
                      </button>
                    </div>
                  </div>
                )}
                <div className="box">
                  <div className="items">
                    <div className="item">
                      <span className="title">From</span>
                      <span className="desc">{dataUser.country}</span>
                    </div>
                    <div className="item">
                      <span className="title">Member since</span>
                      <span className="desc">Aug 2022</span>
                    </div>
                    <div className="item">
                      <span className="title">Avg. response time</span>
                      <span className="desc">4 hours</span>
                    </div>
                    <div className="item">
                      <span className="title">Last delivery</span>
                      <span className="desc">1 day</span>
                    </div>
                    <div className="item">
                      <span className="title">Languages</span>
                      <span className="desc">English</span>
                    </div>
                  </div>
                  <hr />
                  <p>{dataUser.desc}</p>
                </div>
              </div>
            )}
            <Reviews gigID={gigID} />
          </div>
          <div className="right">
            <div className="price">
              <h3>{data.shortTitle}</h3>
              <h2>$ {data.price}</h2>
            </div>
            <p>{data.shortDesc}</p>
            <div className="details">
              <div className="item">
                <img src="/img/clock.png" alt="" />
                <span>{data.deliveryTimes} Days Delivery</span>
              </div>
              <div className="item">
                <img src="/img/recycle.png" alt="" />
                <span>{data.revisionNumber} Revisions</span>
              </div>
            </div>
            <div className="features">
              {data.features.map((feature) => (
                <div key={feature} className="item">
                  <img src="/img/greencheck.png" alt="" />
                  <span>{feature}</span>
                </div>
              ))}
            </div>

            <button onClick={handelContinue}>Continue</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Gig;
