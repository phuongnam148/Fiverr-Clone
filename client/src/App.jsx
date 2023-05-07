import React, { useEffect } from "react";
import Navbar from "./components/navbar/Navbar";
import { createBrowserRouter, RouterProvider, Outlet } from "react-router-dom";
import Footer from "./components/footer/Footer";
import Home from "./pages/home/Home";
import Gigs from "./pages/gigs/Gigs";
import Gig from "./pages/gig/Gig";
import Add from "./pages/add/Add";
import Orders from "./pages/orders/Orders";
import MyGigs from "./pages/myGigs/MyGigs";
import Message from "./pages/message/Message";
import Messages from "./pages/messages/Messages";
import Register from "./pages/register/Register";
import Login from "./pages/login/Login";
import Pay from "./pages/pay/Pay";
import Success from "./pages/success/Success";

import {
  QueryClient,
  QueryClientProvider,
  useQuery,
} from "@tanstack/react-query";
import newRequest from "./utils/newRequest";
import Profile from "./pages/profile/Profile";
import Error from "./routes/error/Error";

const queryClient = new QueryClient();

const App = () => {
  const checkUser = async () => {
    try {
      const res = await newRequest.get("/users");
      localStorage.setItem("currentUser", JSON.stringify(res.data));
      // navigate('/');
    } catch (error) {
      localStorage.setItem("currentUser", null);
      console.log(error);
    }
  };

  useEffect(() => {
    checkUser();
  }, []);

  const Layout = () => {
    return (
      <div className="app">
        <QueryClientProvider client={queryClient}>
          <Navbar />
          <Outlet />
          <Footer />
        </QueryClientProvider>
      </div>
    );
  };
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Layout />,
      errorElement: <Error />,
      children: [
        {
          path: "/",
          element: <Home />,
        },
        {
          path: "/gigs",
          element: <Gigs />,
        },
        {
          path: "/gig/:gigID",
          element: <Gig />,
        },
        {
          path: "/orders",
          element: <Orders />,
        },
        {
          path: "/mygigs",
          element: <MyGigs />,
        },
        {
          path: "/add",
          element: <Add />,
        },
        {
          path: "/messages",
          element: <Messages />,
        },
        {
          path: "/message/:id",
          element: <Message />,
        },
        {
          path: "/register",
          element: <Register />,
        },
        {
          path: "/login",
          element: <Login />,
        },
        {
          path: "/pay/:gigID",
          element: <Pay />,
        },
        {
          path: "/success",
          element: <Success />,
        },
        {
          path: "/profile",
          element: <Profile />,
        },
      ],
    },
  ]);
  return <RouterProvider router={router} />;
};

export default App;
