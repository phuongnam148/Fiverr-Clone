import { useQuery } from '@tanstack/react-query';
import React from 'react';
import newRequest from '../../utils/newRequest';
import './Orders.scss';
import TdOrderUsername from './TdOrderUsername';
import { useNavigate } from 'react-router-dom';
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
  const navigate = useNavigate();

  const handelContact = async (order) => {
    const sellerID = order.sellerID;
    const buyerID = order.buyerID;
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
    <div className="orders">
      <div className="container">
        <div className="title">
          <h1>Orders</h1>
        </div>
        {isLoading ? (
          'Loading...'
        ) : error ? (
          `An error has occurred:  ${error.message}`
        ) : data.length === 0 ? (
          <h4>No Orders Yet</h4>
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

                  <TdOrderUsername order={order} />

                  <td>
                    <img
                      className="message"
                      src="./img/message.png"
                      alt=""
                      onClick={() => handelContact(order)}
                    />
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
