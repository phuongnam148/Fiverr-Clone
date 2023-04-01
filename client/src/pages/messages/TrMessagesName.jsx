import React from 'react';
import moment from 'moment';
import { Link } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import newRequest from '../../utils/newRequest';

const TrMessagesName = ({ c, handelRead }) => {
  const currentUser = JSON.parse(localStorage.getItem('currentUser'));

  const userId = currentUser.isSeller ? c.buyerID : c.sellerID;
  const { isLoading, error, data } = useQuery({
    queryKey: [c.id],
    queryFn: () =>
      newRequest.get(`/users/${userId}`).then((res) => {
        return res.data;
      }),
    enabled: !!userId, // ko có user id sẽ ko chạy hàm này
  });

  const isActive =
    (currentUser.isSeller && !c.readBySeller) ||
    (!currentUser.isSeller && !c.readByBuyer)
      ? true
      : false;
  return (
    <tr className={isActive ? 'active' : ''}>
      <td>
        {isLoading
          ? 'Loading..'
          : error
          ? `Something wrong... ${error}`
          : data.username}
      </td>
      <td>
        <Link to={`/message/${c.id}`} className="link">
          {c?.lastMessage?.substring(0, 100)}...
        </Link>
      </td>
      <td>{moment(c.updatedAt).fromNow()}</td>
      <td>
        {isActive ? (
          <button onClick={() => handelRead(c.id)}>Mark as Read</button>
        ) : (
          ''
        )}
      </td>
    </tr>
  );
};

export default TrMessagesName;
