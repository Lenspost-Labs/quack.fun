import React from "react";
import LeftSidebar from "../appMantle/leftMantle/LeftSidebar.tsx";
import Navbar from "../appMantle/topMantle/Navbar.tsx";
import TopicsCard from "../Components/Cards/TopicsCard.tsx";
import Search, { SearchProps } from "antd/es/input/Search";
import { Outlet } from "react-router-dom";

// const MainAppLayout : React.FC = ( ) => {
//   const  onSearch: SearchProps["onSearch"] = (value, _e, info) =>
//     console.log(info?.source, value);

//   return (
//     <>
//       <Navbar />
//       <div className="flex justify-around">
//         <div className=" m-4">
//           <LeftSidebar />
//         </div>

//         <div className="w-1/3 m-4 ">
//           <div className="h-100 overflow-y-auto">
//             <Outlet />
//           </div>
//         </div>

//         <div className="w-1/6 m-4 ">
//           <Search
//             placeholder="Search the internet"
//             allowClear
//             size="large"
//             enterButton="Search"
//             onSearch={onSearch}
//             className="w-full my-2"
//           />
//           <TopicsCard />
//         </div>
//       </div>
//     </>
//   );
// };

// export default MainAppLayout;
interface MainAppLayoutProps {
  // define props here if needed
}

const MainAppLayout: React.FC<MainAppLayoutProps> = () => {
  const onSearch: SearchProps["onSearch"] = (value, _e, info) =>
    console.log(info?.source, value);

  return (
    <>
      <Navbar />
      <div className="flex justify-around">
        <div className="m-4">
          <LeftSidebar />
        </div>

        <div className="w-1/3 m-4 ">
          <div className="h-100 overflow-y-auto">
            <Outlet />
          </div>

          {/* <FeedWrapper /> */}

        </div>

        <div className="w-1/6 m-4 ">
          <Search
            placeholder="Search the internet"
            allowClear
            size="large"
            enterButton="Search"
            onSearch={onSearch}
            className="w-full my-2"
          />
          <TopicsCard />
        </div>
      </div>
    </>
  );
};

export default MainAppLayout;