import { useQuery } from "@tanstack/react-query";
import React, { useEffect, useRef, useState } from "react";
import { useLocation } from "react-router-dom";
import GigCard from "../../components/gigCard/GigCard";
import newRequest from "../../utils/newRequest";
import "./Gigs.scss";
import { category, cards } from "../../data";
const Gigs = () => {
  const [sort, setSort] = useState("createdAt");
  const [open, setOpen] = useState(false);
  const minRef = useRef(0);
  const maxRef = useRef(1000);

  const { search } = useLocation();
  const cateID = search.substr(-1);
  // console.log(cateID);
  const { isLoading, error, data, refetch } = useQuery({
    queryKey: ["gigs"],
    queryFn: () =>
      newRequest
        .get(
          `/gigs${search}&min=${minRef.current.value}&max=${maxRef.current.value}&sort=${sort}`
        )
        .then((res) => {
          return res.data;
        }),
  });

  useEffect(() => {
    refetch();
  }, [search]);

  const reSort = (type) => {
    setSort(type);
    setOpen(false);
  };

  useEffect(() => {
    refetch();
  }, [sort]);

  const apply = () => {
    refetch();
  };
  return (
    <div className="gigs">
      <div className="container">
        <span className="breadcrumbs">Home / {category[cateID - 1].title}</span>
        <h1>{cards[cateID - 1].title}</h1>
        <p>
          Explore the boundaries of art and technology with Fiverr{"'"}s AI
          artists
        </p>
        <div className="menu">
          <div className="left">
            <span>Budget</span>
            <input ref={minRef} type="number" placeholder="min" />
            <input ref={maxRef} type="number" placeholder="max" />
            <button onClick={apply}>Apply</button>
          </div>
          <div className="right">
            <span className="sortBy">Sort by</span>
            <span className="sortType">
              {sort === "sales" && "Best Selling"}
              {sort === "price" && "Price"}
              {sort === "createdAt" && "Newest"}
            </span>
            <img src="./img/down.png" alt="" onClick={() => setOpen(!open)} />
            {open && (
              <div className="rightMenu">
                {sort === "sales" && (
                  <>
                    <span onClick={() => reSort("createdAt")}>Newest</span>
                    <span onClick={() => reSort("price")}>Price</span>
                  </>
                )}
                {sort === "price" && (
                  <>
                    <span onClick={() => reSort("sales")}>Best Selling</span>
                    <span onClick={() => reSort("createdAt")}>Newest</span>
                  </>
                )}
                {sort === "createdAt" && (
                  <>
                    <span onClick={() => reSort("price")}>Price</span>
                    <span onClick={() => reSort("sales")}>Best Selling</span>
                  </>
                )}
              </div>
            )}
          </div>
        </div>
        <div className="cards">
          {isLoading
            ? "loading"
            : error
            ? "Something went wrong..."
            : data.length > 0 &&
              data.map((gig) => <GigCard key={gig._id} item={gig} />)}
        </div>
      </div>
    </div>
  );
};

export default Gigs;
