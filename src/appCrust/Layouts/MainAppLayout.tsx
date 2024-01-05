import React, { useEffect } from "react";
import LeftSidebar from "../appMantle/leftMantle/LeftSidebar.tsx";
import Navbar from "../appMantle/topMantle/Navbar.tsx";
import TopicsCard from "../Components/Cards/TopicsCard.tsx";
import { Outlet } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import BottomNavbar from "../Components/Navbars/BottomNavbar.tsx";
import CustomSearchIp from "../Components/Items/CustomSearchIp.tsx";

interface MainAppLayoutProps {
  // define props here if needed
}

const MainAppLayout: React.FC<MainAppLayoutProps> = () => {
  const navigate = useNavigate();

  useEffect(() => {
    navigate("/feed");
  }, []);

 
  return (
    <>
      <Navbar />
      <div className="flex justify-center">
        <div className="m-4 hidden md:block">
          <LeftSidebar />
        </div>
        <div className="">
          <BottomNavbar />
        </div>

        <div className="w-full m-4 md:w-2/4 lg:w-1/3">
          <Outlet />

          {/* <FeedWrapper /> */}
        </div>

        <div className="hidden m-4 lg:block w-1/6">
        <CustomSearchIp/>
          <TopicsCard />
        </div>
      </div>
    </>
  );
};

export default MainAppLayout;
