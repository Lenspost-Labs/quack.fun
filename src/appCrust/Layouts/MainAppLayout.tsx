import React from "react";
import LeftSidebar from "../appMantle/leftMantle/LeftSidebar.tsx";
import TopicsCard from "../Components/Cards/TopicsCard.tsx";
import { Navigate, Outlet } from "react-router-dom";
import { useLocation } from "react-router-dom";
import BottomNavbar from "../Components/Navbars/BottomNavbar.tsx";
import CustomSearchIp from "../Components/Items/CustomSearchIp.tsx";
import { Divider, Tabs, TabsProps } from "antd";
import NewPostCard from "../Components/Cards/NewPostCard.tsx";
import TopNavbar from "../Components/Navbars/TopNavbar.tsx";

const MainAppLayout: React.FC<any> = () => {
  const { pathname } = useLocation();
  console.log(pathname);

  const items: TabsProps["items"] = [
    {
      key: "1",
      label: "For You",
      // children: <PostsWrapper />,
    },
    {
      key: "2",
      label: "Following",
      // children: <CommentsWrapper />,
    },
    {
      key: "3",
      label: "Meme",
      // children: <CommentsWrapper />,
    },
  ];

  const onChange = (key: string) => {
    console.log(key);
  };

  return (
    <>
      {/* Enabled only for mobile */}
      <TopNavbar />
      {/* <Navigate to="/feed" /> */}
      <div className="flex justify-center">
        <div className="my-2 border-r border-slate-200 hidden md:block h-100vh">
          <LeftSidebar />
        </div>
        <div className="">
          {/* Enabled only for Mobile */}
          <BottomNavbar />
        </div>{" "}
        <Divider type="vertical" className="h-full" />
        <div
          id="InfScrolltarget"
          className="w-full h-96vh overflow-scroll my-2 md:w-2/4 lg:w-1/3 no-scrollbar"
        >
          <div className="mx-2">
            {pathname === "/feed" && (
              <>
                <div className="sticky top-0 z-20 bg-white">
                  <Tabs
                    defaultActiveKey="1"
                    items={items}
                    onChange={onChange}
                  />
                </div>
                <NewPostCard isInFeed={true} />
              </>
            )}
            <Outlet />
          </div>
        </div>
        <Divider type="vertical" className="h-full" />
        <div className="pl-2 hidden my-2  border-l border-slate-200 lg:block w-1/6">
          <CustomSearchIp />
          <TopicsCard />
        </div>
      </div>
    </>
  );
};

export default MainAppLayout;
