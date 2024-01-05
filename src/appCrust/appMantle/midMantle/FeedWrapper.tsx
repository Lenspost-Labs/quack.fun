// import React, { useEffect, useState } from "react";
// import PostDetailsCard from "src/appCrust/Components/Cards/PostDetailsCard";
// import { apiGetPosts } from "src/services/BEApis/PostsApi";

// const FeedWrapper = () => {
//   const [posts, setPosts] = useState([]);
//   const [loading, setLoading] = useState(false);

//   useEffect(() => {
//     const fetchPosts = async () => {
//       setLoading(true);
//       const res = await apiGetPosts();

//       console.log("IN API - RESPONSE");
//       console.log(res.data);
//       setPosts(res.data.slice(0, 5));
//       setLoading(false);
//     };
//     fetchPosts();
//   });

//   return (
//     <>
//       {posts.length > 0 ? (
//         posts.map(() => (
            
   
//         <PostDetailsCard
//           userProfileName={""}
//           userProfileUsername={""}
//           userPostImage={""}
//           userProfileImage={""}
//           userProfilePostText={""}
//         />
//         ))  ) : (
//           <h1>No Posts</h1>
//         )
//       }
//     </>
//   );
// };

// export default FeedWrapper;

// // https://jsonplaceholder.typicode.com/posts/1
