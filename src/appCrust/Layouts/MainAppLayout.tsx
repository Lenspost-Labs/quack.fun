import React, { useEffect } from "react";
import LeftSidebar from "../appMantle/leftMantle/LeftSidebar.tsx";
import TopicsCard from "../Components/Cards/TopicsCard.tsx";
import { Outlet } from "react-router-dom";
import { useNavigate, useLocation } from "react-router-dom";
import BottomNavbar from "../Components/Navbars/BottomNavbar.tsx";
import CustomSearchIp from "../Components/Items/CustomSearchIp.tsx";
import { Divider, Tabs, TabsProps } from "antd";
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
      {/* <div className="h-50vh"> */}
      <div className="flex justify-center">
        <div className="my-2 border-r border-slate-200 hidden md:block h-100vh">
          <LeftSidebar />
        </div>
        <div className="">
          {/* <div className="p-4 pl-0 text-md">Solgram Logo</div> */}
          <BottomNavbar />
        </div>{" "}
        <Divider type="vertical" className="h-full" />
        <div className="w-full h-96vh overflow-scroll my-2 md:w-2/4 lg:w-1/3">
          <div className="">
            {pathname === "/feed" && (
              <>
                <Tabs defaultActiveKey="1" items={items} onChange={onChange} />
                <NewPostCard isInFeed={true} />
              </>
            )}
            <Outlet />
          </div>

          {/* <FeedWrapper /> */}
        </div>
        <Divider type="vertical" className="h-full" />
        <div className="pl-2 hidden my-2  border-l border-slate-200 lg:block w-1/6">
          <CustomSearchIp />
          <TopicsCard />
        </div>
      </div>
      {/* </div> */}
    </>
  );
};

export default MainAppLayout;
