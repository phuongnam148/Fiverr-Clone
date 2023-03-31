import React from 'react';
import './Messages.scss';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
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
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: (id) => {
      return newRequest.put(`/conversations/${id}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries(['conversations']);
    },
  });

  const handelRead = (id) => {
    console.log(id);
    mutation.mutate(id);
  };

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
                <th></th>
              </tr>
            </thead>
            <tbody>
              {data.map((c) => (
                <TrMessagesName key={c.id} c={c} handelRead={handelRead} />
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default Messages;
