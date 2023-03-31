import { useQuery } from '@tanstack/react-query';
import React from 'react';
import newRequest from '../../utils/newRequest';

const TdOrderUsername = ({ order }) => {
  const currentUser = JSON.parse(localStorage.getItem('currentUser'));

  const userId = currentUser.isSeller ? order?.buyerID : order?.sellerID;

  const { isLoading, error, data } = useQuery({
    queryKey: [userId],
    queryFn: () =>
      newRequest.get(`/users/${userId}`).then((res) => {
        return res.data;
      }),
    enabled: !!userId, // ko có user id sẽ ko chạy hàm này
  });

  return (
    <td>
      {isLoading
        ? 'Loading...'
        : error
        ? `An error has occurred:  ${error.message}`
        : data.username}
    </td>
  );
};

export default TdOrderUsername;
