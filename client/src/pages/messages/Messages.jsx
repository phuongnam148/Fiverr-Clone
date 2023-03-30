import React from 'react';
import './Messages.scss';
import { Link } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import newRequest from '../../utils/newRequest';
import TrMessagesName from './TrMessagesName';

const Messages = () => {
  const currentUser = JSON.parse(localStorage.getItem('currentUser'));

  const { isLoading, error, data } = useQuery({
    queryKey: ['conversations'],
    queryFn: () =>
      newRequest.get(`/conversations`).then((res) => {
        return res.data;
      }),
  });

  const userId = currentUser.isSeller ? data?.buyerID : data?.sellerID;

  return (
    <div className="messages">
      {isLoading ? (
        'Loading...'
      ) : error ? (
        `Something wrong: ${error}`
      ) : (
        <div className="container">
          <div className="title">
            <h1>Messages</h1>
          </div>
          <table>
            <thead>
              <tr>
                <th>{currentUser.isSeller ? 'Buyer' : 'Seller'}</th>
                <th>Last Message</th>
                <th>Date</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {data.map((c) => (
                <TrMessagesName key={c.id} c={c} />
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default Messages;
