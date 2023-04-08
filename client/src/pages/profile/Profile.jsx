import React from 'react';
import './Profile.scss';
import { useQuery } from '@tanstack/react-query';
import newRequest from '../../utils/newRequest';
import { useState } from 'react';
import upload from '../../utils/upload';

const Profile = () => {
  const { isLoading, error, data, refetch } = useQuery({
    queryKey: ['user'],
    queryFn: () =>
      newRequest.get(`/users`).then((res) => {
        return res.data;
      }),
  });

  const handelChange = async (e) => {
  
    // console.log(url);
    const url = await upload(e.target.files[0]);
    try {
      console.log(url);
      await newRequest.put('/users', {
        img: url,
      });
      refetch();
    } catch (error) {
      console.log(error);
      if (error.response.status === 500)
        alert('Email or Username already exists');
    }
  };

  return (
    <div className="profile">
      {isLoading ? (
        'Loading'
      ) : error ? (
        `Something wrong ${error.response.data}`
      ) : (
        <div className="container">
          <label htmlFor="avatar">
            <img
              src={
                data.img ||
                'https://www.brightlands.com/sites/default/files/2019-12/No%20avater.jpg'
              }
              alt=""
            />
          </label>
          <input id="avatar" type="file" onChange={(e) => handelChange(e)} />

          <h2>{data.username}</h2>
          <span>{data.email}</span>
          <hr />
          <div className="flex">
            <div className="left">
              <i className="fa fa-map-marker-alt"></i> From
            </div>
            <div className="right">
              <b>{data.country}</b>
            </div>
          </div>
          <div className="flex">
            <div className="left">
              <i className="fa fa-user"></i> Member since
            </div>
            <div className="right">
              <b>
                {data.createdAt.split('-')[1]}-{data.createdAt.split('-')[0]}
              </b>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Profile;
