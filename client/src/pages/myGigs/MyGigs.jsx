import React from "react";
import "./MyGigs.scss";
import { Link } from "react-router-dom";
import getCurrentUser from "../../utils/getCurrentUser";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import newRequest from "../../utils/newRequest";
const myGIgs = () => {
  const currentUser = getCurrentUser();
  const { isLoading, error, data } = useQuery({
    queryKey: ["myGigs"],
    queryFn: () =>
      newRequest.get(`/gigs?userID=${currentUser._id}`).then((res) => {
        return res.data;
      }),
  });

  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: (id) => {
      return newRequest.delete(`/gigs/${id}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["myGigs"]);
    },
  });

  const handleDelete = (id) => {
    if (window.confirm("Delete gig?")) mutation.mutate(id);
  };
  return (
    <div className="myGigs">
      {isLoading ? (
        "Loading"
      ) : error ? (
        `Somthing wrong... ${error}`
      ) : (
        <div className="container">
          <div className="title">
            <h1>{currentUser.isSeller ? "Gigs" : "Orders"}</h1>
            {currentUser.isSeller && (
              <Link to="/add">
                <button>Add New Gig</button>
              </Link>
            )}
          </div>
          <table>
            <thead>
              <tr>
                <th>Image</th>
                <th>Title</th>
                <th>Price</th>
                <th>Sales</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {data.map((item) => (
                <tr key={item._id}>
                  <td>
                    <Link to={`/gig/${item._id}`}>
                      <img
                        className="image"
                        src={item.cover}
                        alt=""
                        onClick={() => handleDelete}
                      />
                    </Link>
                  </td>
                  <td>
                    <Link to={`/gig/${item._id}`}>{item.title} </Link>
                  </td>
                  <td>{item.price}</td>
                  <td>{item.sales}</td>
                  <td>
                    <img
                      className="delete"
                      src="./img/delete.png"
                      alt=""
                      onClick={() => handleDelete(item._id)}
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default myGIgs;
