import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import React from "react";
import { Link, useParams } from "react-router-dom";
import newRequest from "../../utils/newRequest";
import "./Message.scss";
const Message = () => {
  const { id } = useParams();
  const currentUser = JSON.parse(localStorage.getItem("currentUser"));
  const sellerID = id.split(currentUser._id);
  const { isLoading, error, data } = useQuery({
    queryKey: ["messages"],
    queryFn: () =>
      newRequest.get(`/messages/${id}`).then((res) => {
        return res.data;
      }),
  });
  // const {
  //   isLoading: isLoadingSeller,
  //   error: errorSeller,
  //   data: dataSeller,
  // } = useQuery({
  //   queryKey: ["Seller"],
  //   queryFn: () =>
  //     newRequest.get(`/users/${sellerID}`).then((res) => {
  //       return res.data;
  //     }),
  // });

  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: (message) => {
      return newRequest.post(`/messages`, message);
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["messages"]);
    },
  });
  const handelSubmit = (e) => {
    e.preventDefault();
    const message = {
      conversationID: id,
      desc: e.target[0].value,
    };

    mutation.mutate(message);

    e.target[0].value = ""; // clear textarea mỗi khi submit
  };
  return (
    <div className="message">
      {isLoading ? (
        "Loading..."
      ) : error ? (
        `Something wrong... ${error}`
      ) : (
        <div className="container">
          <span className="breadcrumbs">
            <>
              <Link to="/messages">Messages</Link> /
            </>
          </span>
          <div className="m_messages">
            {data.map((m) => (
              <div
                key={m._id}
                className={m.userID === currentUser._id ? "item owner" : "item"}
              >
                <img
                  src="https://images.pexels.com/photos/270408/pexels-photo-270408.jpeg?auto=compress&cs=tinysrgb&w=1600"
                  alt=""
                />
                <p>{m.desc}</p>
              </div>
            ))}
          </div>
          <hr />
          <form className="write" onSubmit={handelSubmit}>
            <textarea type="text" placeholder="Write a message" />
            <button type="submit">Send</button>
          </form>
        </div>
      )}
    </div>
  );
};

export default Message;
