import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import React from 'react';
import { Link, useParams } from 'react-router-dom';
import newRequest from '../../utils/newRequest';
import './Message.scss';
const Message = () => {
  const { id } = useParams();

  const { isLoading, error, data } = useQuery({
    queryKey: ['messages'],
    queryFn: () =>
      newRequest.get(`/messages/${id}`).then((res) => {
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


  return (
    <div className="message">
      {isLoading ? (
        'Loading...'
      ) : error ? (
        `Something wrong... ${error}`
      ) : (
        <div className="container">
          <span className="breadcrumbs">
            <Link to="/messages">Messages</Link> / John Doe
          </span>
          <div className="m_messages">
            {data.map((m) => (
              <div key={m._id} className="item as">
                <img
                  src="https://images.pexels.com/photos/270408/pexels-photo-270408.jpeg?auto=compress&cs=tinysrgb&w=1600"
                  alt=""
                />
                <p>{m.desc}</p>
              </div>
            ))}
          </div>
          <hr />
          <div className="write">
            <textarea type="text" placeholder="write a message" />
            <button>Send</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Message;
