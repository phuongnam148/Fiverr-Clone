/* eslint-disable react/no-unescaped-entities */
import React from 'react';
import Featured from '../../components/featured/Featured';

import 'swiper/css';
import 'swiper/css/navigation';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper';

import { cards, projects } from '../../data';

import TrustedBy from '../../components/trustedBy/TrustedBy';
import './Home.scss';
import CatCard from '../../components/catCard/CatCard';
import ProjectCard from '../../components/ProjectCard/ProjectCard';
const Home = () => {
  return (
    <div className="home">
      <Featured />

      <TrustedBy />

      <div className="slide">
        <div className="container">
          <h1>Popular professional services</h1>
          <Swiper
            rewind={true}
            spaceBetween={15}
            slidesPerView={5}
            navigation={true}
            modules={[Navigation]}
          >
            {cards.map((card) => (
              <SwiperSlide key={card.id}>
                <CatCard item={card} key={card.id} />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>

      <div className="features">
        <div className="container">
          <div className="item">
            <h1>A whole world of freelance talent at your fingertips</h1>
            <div className="title">
              <img src="./img/check.png" alt="" />{' '}
              <h3>The best for every budget</h3>
            </div>
            <p>
              Find high-quality services at every price point. No hourly rates,
              just project-based pricing.
            </p>
            <div className="title">
              <img src="./img/check.png" alt="" />{' '}
              <h3>Quality work done quickly</h3>
            </div>
            <p>
              Find the right freelancer to begin working on your project within
              minutes.
            </p>{' '}
            <div className="title">
              <img src="./img/check.png" alt="" />{' '}
              <h3>Protected payments, every time</h3>
            </div>
            <p>
              Always know what you'll pay upfront. Your payment isn't released
              until you approve the work.
            </p>
            <div className="title">
              <img src="./img/check.png" alt="" />
              <h3>24/7 support</h3>
            </div>
            <p>
              Questions? Our round-the-clock support team is available to help
              anytime, anywhere.
            </p>
          </div>
          <div className="item">
            <video
              src="https://fiverr-res.cloudinary.com/video/upload/t_fiverr_hd/vmvv3czyk2ifedefkau7"
              controls
            ></video>
          </div>
        </div>
      </div>

      <div className="features dark">
        <div className="container">
          <div className="item">
            <span className="h2">
              <b>fiverr</b> <i>business</i>
            </span>
            <p className="h1">
              <b>
                {' '}
                A business solution
                <br /> designed for
              </b>{' '}
              <i>teams</i>
            </p>
            <p className="mx-2">
              Upgrade to a curated experience packed with tools and benefits,
              dedicated to businesses
            </p>
            <div className="title">
              <img src="./img/check.png" alt="" />
              Connect to freelancers with proven business experience
            </div>

            <div className="title">
              <img src="./img/check.png" alt="" />
              Get matched with the perfect talent by a customer success manager
            </div>
            <div className="title">
              <img src="./img/check.png" alt="" /> Manage teamwork and boost
              productivity with one powerful workspace
            </div>

            <button>Explore Fiverr Business</button>
          </div>
          <div className="item">
            <img
              className="item_img"
              src="https://fiverr-res.cloudinary.com/q_auto,f_auto,w_870,dpr_1.0/v1/attachments/generic_asset/asset/d9c17ceebda44764b591a8074a898e63-1599597624757/business-desktop-870-x1.png"
            />
          </div>
        </div>
      </div>

      <div className="slide gray">
        <div className="container">
          <h1>Get inspired with projects made by our freelancers</h1>
          <Swiper
            rewind={true}
            slidesPerView={4}
            navigation={true}
            modules={[Navigation]}
          >
            {projects.map((card) => (
              <SwiperSlide key={card.id}>
                <ProjectCard item={card} key={card.id} />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
    </div>
  );
};

export default Home;
