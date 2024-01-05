import React from "react";
import  { createBrowserRouter } from "react-router-dom";
import App from "./App.tsx";
import PostsWrapper from "./appCrust/Components/Wrappers/PostsWrapper.tsx";
import NotificationsWrapper from "./appCrust/Components/Wrappers/NotificationsWrapper.tsx";
import ProfileSectionCard from "./appCrust/Components/Cards/ProfileSectionCard.tsx";

const  router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    // errorElement: <ErrorPage />,
    children: [
      {
        path: "/feed",
        element: <PostsWrapper />,
        // errorElement: <ErrorPage />,
      },

      {
        path: "/notifications",
        element: <NotificationsWrapper />,
        // errorElement: <ErrorPage />,
      },

      {
        path: "/feed",
        element: <PostsWrapper />,
        // errorElement: <ErrorPage />,
      },

      {
        path: "/profile",
        element: <ProfileSectionCard />,
        // errorElement: <ErrorPage />,
      }
    ],
  },
]);

export default router;