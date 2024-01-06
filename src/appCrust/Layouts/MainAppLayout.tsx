import React, { useEffect } from "react";
import LeftSidebar from "../appMantle/leftMantle/LeftSidebar.tsx";
import TopicsCard from "../Components/Cards/TopicsCard.tsx";
import { Outlet } from "react-router-dom";
import { useNavigate, useLocation } from "react-router-dom";
import BottomNavbar from "../Components/Navbars/BottomNavbar.tsx";
import CustomSearchIp from "../Components/Items/CustomSearchIp.tsx";
import { Tabs, TabsProps } from "antd";
import NewPostCard from "../Components/Cards/NewPostCard.tsx";

interface MainAppLayoutProps {
  // define props here if needed
}

const MainAppLayout: React.FC<MainAppLayoutProps> = () => {
  const navigate = useNavigate();

  const { pathname } = useLocation();
  console.log(pathname);

  useEffect(() => {
    navigate("/feed");
  }, []);

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
      {/* <Navbar /> */}
      <div className="flex flex-col">
        <div className="flex justify-center">
          <div className="m-2 hidden md:block">
            <div className="p-4 pl-0 text-lg">Solgram Logo</div>
            <LeftSidebar />
          </div>
          <div className="">
            {/* <div className="p-4 pl-0 text-md">Solgram Logo</div> */}
            <BottomNavbar />
          </div>

          <div className="w-full h-96vh overflow-scroll m-2 md:w-2/4 lg:w-1/3">
            <div className="">
              {pathname === "/feed" && (
                <>
                  <Tabs
                    defaultActiveKey="1"
                    items={items}
                    onChange={onChange}
                  />
                  <NewPostCard />
                </>
              )}
              <Outlet />
            </div>

            {/* <FeedWrapper /> */}
          </div>

          <div className="hidden m-2 lg:block w-1/6">
            <CustomSearchIp />
            <TopicsCard />
          </div>
        </div>
      </div>
    </>
  );
};

export default MainAppLayout;
