import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";

import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Home from "./pages/home/Home";
import Gigs from "./pages/gigs/Gigs";
import Gig from "./pages/gig/Gig";
import Orders from "./pages/orders/Orders";
import MyGigs from "./pages/myGigs/MyGigs";
import Add from "./pages/add/Add";
import Messages from "./pages/messages/Messages";
import Message from "./pages/message/Message";
import Register from "./pages/register/Register";
import Login from "./pages/login/Login";
import Pay from "./pages/pay/Pay";
import Success from "./pages/success/Success";
import Profile from "./pages/profile/Profile";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import UserLayout from "./routes/UserLayout";
import Error from "./routes/error/Error";

const router = createBrowserRouter([
  {
    path: "/",
    element: <UserLayout />,
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

// const router = createBrowserRouter(
//   createRoutesFromElements(
//     <Route path="/" element={<UserLayout />} errorElement={<Error />}>
//       <Route errorElement={<Error />}>
//         <Route path="/" element={<Home />} />
//         <Route path="/gigs" element={<Gigs />} />
//       </Route>
//     </Route>
//   )
// );

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
    </QueryClientProvider>
  </React.StrictMode>
);
