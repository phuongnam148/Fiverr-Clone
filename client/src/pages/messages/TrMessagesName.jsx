import React from 'react';
import moment from 'moment';
import { Link } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import newRequest from '../../utils/newRequest';

const TrMessagesName = ({ c }) => {
  const currentUser = JSON.parse(localStorage.getItem('currentUser'));

  const userId = currentUser.isSeller ? c.buyerID : c.sellerID;
  const { isLoading, error, data } = useQuery({
    queryKey: ['userId'],
    queryFn: () =>
      newRequest.get(`/users/${userId}`).then((res) => {
        return res.data;
      }),
    enabled: !!userId, // ko có user id sẽ ko chạy hàm này
  });
  return (
    <tr className="active">
      <td>{isLoading ? 'Loading..' : data.username}</td>
      <td>
        <Link to="/message/123" className="link">
          {c?.lastMessage?.substring(0, 100)}...
        </Link>
      </td>
      <td>{moment(c.updatedAt).fromNow()}</td>
      <td>
        <button>Mark as Read</button>
      </td>
    </tr>
  );
};

export default TrMessagesName;
