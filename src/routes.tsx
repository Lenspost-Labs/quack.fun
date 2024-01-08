import React from "react";
import { Outlet, createBrowserRouter } from "react-router-dom";
import App from "./App.tsx";
import PostsWrapper from "./appCrust/Components/Wrappers/PostsWrapper.tsx";
import NotificationsWrapper from "./appCrust/Components/Wrappers/NotificationsWrapper.tsx";
import ProfilePageWrapper from "./appCrust/Components/Wrappers/ProfilePageWrapper.tsx";
import PostDetailsCard from "./appCrust/Components/Cards/PostDetailsCard.tsx";
import SinglePostWrapper from "./appCrust/Components/Wrappers/SinglePostWrapper.tsx";
import { apiGetPosts } from "./services/BEApis/PostsAPIs/PostsApi.tsx";

const fnGetAllPosts = async () => {
  const allPostsRes = await apiGetPosts();
  console.log(allPostsRes);
  return allPostsRes?.status === 200 ? { allPostsRes } : [];
};

const router = createBrowserRouter([
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
        element: <ProfilePageWrapper />,
        // errorElement: <ErrorPage />,
      },

      {
        path: "/post/:postId",
        element: <SinglePostWrapper />,
        // errorElement: <ErrorPage />,
      },
    ],
  },
]);

export default router;
