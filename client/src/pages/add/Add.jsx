import React, { useReducer, useState } from "react";
import "./Add.scss";
import { INITIAL_STATE, gigReducer } from "../../reducers/gigReducer";
import upload from "../../utils/upload";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import newRequest from "../../utils/newRequest";
import { category } from "../../data";

const Add = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: (gig) => {
      return newRequest.post(`/gigs`, gig);
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["myGigs"]);
      alert("Add gig success");
      navigate("/mygigs");
    },
    onError: (error) => {
      // An error happened!
      alert(error.response.data);
    },
  });

  // const [singleFile, setSingleFile] = useState(undefined);
  // const [files, setFiles] = useState([]);
  // const [uploading, setUploading] = useState(false);

  const [state, dispatch] = useReducer(gigReducer, INITIAL_STATE);

  const handleChange = (e) => {
    dispatch({
      type: "CHANGE_INPUT",
      payload: { name: e.target.name, value: e.target.value },
    });
  };
  const handleFeature = (e) => {
    e.preventDefault();
    dispatch({
      type: "ADD_FEATURE",
      payload: e.target[0].value,
    });
    e.target[0].value = "";
  };
  const handleImages = (e) => {
    e.preventDefault();
    dispatch({
      type: "ADD_IMAGES",
      payload: e.target[0].value,
    });
    e.target[0].value = "";
  };
  const handleCover = (e) => {
    e.preventDefault();
    dispatch({
      type: "ADD_COVER",
      payload: e.target[0].value,
    });
    e.target[0].value = "";
  };
  // const handleUpload = async () => {
  //   setUploading(true);
  //   try {
  //     const cover = await upload(singleFile);
  //     // console.log("cover:" + cover);
  //     const images = await Promise.all(
  //       [...files].map(async (file) => {
  //         // files là 1 file list, ko phải array nên phải dùng [...files]
  //         const url = await upload(file);
  //         return url;
  //       })
  //     );

  //     setUploading(false);
  //     dispatch({ type: "ADD_IMAGES", payload: { cover, images } });
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  const handleSubmit = async (e) => {
    e.preventDefault();
    mutation.mutate(state);
  };
  console.log(state);
  return (
    <div className="add">
      <div className="container">
        <h1>Add New Gig</h1>
        <div className="sections">
          <div className="info">
            <label htmlFor="">Title</label>
            <input
              type="text"
              name="title"
              placeholder="e.g. I will do something I'm really good at"
              onChange={handleChange}
            />
            <label htmlFor="">Category</label>
            <select
              name="category"
              id="category"
              onChange={handleChange}
              defaultValue="1"
            >
              {category.map((c) => (
                <option key={c.id} value={c.id}>
                  {c.title}
                </option>
              ))}
            </select>

            <label>Cover Image</label>
            <form className="addForm" onSubmit={handleCover}>
              <input type="text" placeholder="Cover Image URL" />
              <button type="submit">Add</button>
            </form>
            <div className="addedFeatures">
              {state.cover ? (
                <img
                  src={state.cover}
                  alt=""
                  onClick={() =>
                    dispatch({ type: "REMOVE_COVER", payload: state.cover })
                  }
                />
              ) : (
                ""
              )}
            </div>
            <label>Gig Images</label>
            <form className="addForm" onSubmit={handleImages}>
              <input type="text" placeholder="Image URL" />
              <button type="submit">Add</button>
            </form>
            <div className="addedFeatures">
              {state?.images?.map((f, index) => (
                <div className="item" key={index}>
                  <img
                    src={f}
                    alt=""
                    onClick={() =>
                      dispatch({ type: "REMOVE_IMAGE", payload: f })
                    }
                  />
                </div>
              ))}
            </div>
            {/* <div className="images">
              <div className="imagesInputs">
              <label htmlFor="">Cover Image</label>
                <input
                  type="file"
                  onChange={(e) => setSingleFile(e.target.files[0])}
                />

                <label htmlFor="">Upload Images</label>
                <input
                  type="file"
                  multiple
                  onChange={(e) => setFiles(e.target.files)}
                />
              </div>
              <button onClick={handleUpload}>
                {uploading ? "Uploading" : "Upload"}
              </button>
              <div className="addedImage">
                {state?.images?.map((f, index) => (
                  <div className="item" key={index}>
                    <button
                      onClick={() =>
                        dispatch({ type: "REMOVE_IMAGE", payload: f })
                      }
                    >
                      <img src={f} alt="" />
                      <span>X</span>
                    </button>
                  </div>
                ))}
              </div>
            </div> */}
            <label htmlFor="">Description</label>
            <textarea
              id=""
              placeholder="Brief descriptions to introduce your service to customers"
              cols="0"
              rows="16"
              name="desc"
              onChange={handleChange}
            ></textarea>
            <button onClick={handleSubmit}>Create</button>
          </div>
          <div className="details">
            <label htmlFor="">Service Title</label>
            <input
              type="text"
              name="shortTitle"
              placeholder="e.g. One-page web design"
              onChange={handleChange}
            />
            <label htmlFor="">Short Description</label>
            <textarea
              name="shortDesc"
              id=""
              placeholder="Short description of your service"
              cols="30"
              rows="10"
              onChange={handleChange}
            ></textarea>
            <label htmlFor="">Delivery Time (e.g. 3 days)</label>
            <input type="number" name="deliveryTimes" onChange={handleChange} />
            <label htmlFor="">Revision Number</label>
            <input
              type="number"
              name="revisionNumber"
              onChange={handleChange}
            />
            <label htmlFor="">Add Features</label>
            <form action="" className="addForm" onSubmit={handleFeature}>
              <input type="text" placeholder="e.g. page design" />
              {/* <input type="text" placeholder="e.g. file uploading" />
              <input type="text" placeholder="e.g. setting up a domain" />
              <input type="text" placeholder="e.g. hosting" /> */}
              <button type="submit">Add</button>
            </form>
            <div className="addedFeatures">
              {state?.features?.map((f, index) => (
                <div className="item" key={index}>
                  <button
                    onClick={() =>
                      dispatch({ type: "REMOVE_FEATURE", payload: f })
                    }
                  >
                    {f}
                    <span>X</span>
                  </button>
                </div>
              ))}
            </div>
            <label htmlFor="">Price</label>
            <input type="number" name="price" onChange={handleChange} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Add;
