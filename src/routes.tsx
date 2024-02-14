import React from "react";
import { createBrowserRouter } from "react-router-dom";
import App from "./App.tsx";
import PostsWrapper from "./appCrust/Components/Wrappers/PostsWrapper.tsx";
import NotificationsWrapper from "./appCrust/Components/Wrappers/NotificationsWrapper.tsx";
import ProfilePageWrapper from "./appCrust/Components/Wrappers/ProfilePageWrapper.tsx";
import SinglePostWrapper from "./appCrust/Components/Wrappers/SinglePostWrapper.tsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    // errorElement: <ErrorPage />,
    children: [
      {
        path: "/feed",
        element: <PostsWrapper isInFeed={true} />,
        // errorElement: <ErrorPage />,
      },

      {
        path: "/notifications",
        element: <NotificationsWrapper />,
        // errorElement: <ErrorPage />,
      },
      {
        path: "/:userFid",
        element: <ProfilePageWrapper />,
        // errorElement: <ErrorPage />,
      },
      // {
      //   path: "/profile/:username",
      //   element: <ProfilePageWrapper />,
      //   // errorElement: <ErrorPage />,
      // },
      // {
      //   path: "/post/:postId",
      //   element: <SinglePostWrapper />,
      //   // errorElement: <ErrorPage />,
      // },
      {
        path: "/:postFid/:postHash",
        element: <SinglePostWrapper />,
        // errorElement: <ErrorPage />,
      },
    ],
  },
]);

export default router;
