import { useQuery } from '@tanstack/react-query';
import React from 'react';
import newRequest from '../../utils/newRequest';
import './Orders.scss';
// import { Link } from "react-router-dom";
const Orders = () => {
  const currentUser = JSON.parse(localStorage.getItem('currentUser'));
  const { isLoading, error, data } = useQuery({
    queryKey: ['orders'],
    queryFn: () =>
      newRequest.get(`/orders`).then((res) => {
        return res.data;
      }),
  });

  const userId =  data?.sellerID ;

  const {
    isLoading: isLoadingUser,
    error: errorUser,
    data: dataUser,
  } = useQuery({
    queryKey: ['userId'],
    queryFn: () =>
      newRequest.get(`/users/${userId}`).then((res) => {
        return res.data;
      }),
    enabled: !!userId, // ko có user id sẽ ko chạy hàm này
  });

 
  return (
    <div className="orders">
      <div className="container">
        <div className="title">
          <h1>Orders</h1>
        </div>
        {isLoading ? (
          'Loading...'
        ) : error ? (
          `An error has occurred:  ${error.message}`
        ) : (
          <table>
            <thead>
              <tr>
                <th>Image</th>
                <th>Title</th>
                <th>Price</th>
                {<th>{currentUser.isSeller ? 'Buyer' : 'Seller'}</th>}
                <th>Contact</th>
              </tr>
            </thead>
            <tbody>
              {data.map((order) => (
                <tr key={order._id}>
                  <td>
                    <img className="image" src={order.image} alt="" />
                  </td>
                  <td>{order.title}</td>
                  <td>
                    {/* 59.<sup>99</sup> */}
                    {order.price}
                  </td>
                  <td>
                    {isLoadingUser
                      ? 'Loading...'
                      : errorUser
                      ? `An error has occurred:  ${errorUser.message}`
                      : dataUser.username}
                  </td>
                  <td>
                    <img className="message" src="./img/message.png" alt="" />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default Orders;
