import React from "react";
import Header from "../Components/header/Header";
import Timeline from "../Components/timeline/Timeline";
import SidebarSection from '../Components/Sidebar/Sidebar'
import useWindowSize from "../hooks/UsingWindowSize";


const Dashboard = () => {
  const { width } = useWindowSize();

  return (
    <div>
      <Header />
      <div
        style={{
          display: "flex",
          maxWidth: "975px",
          width: "100%",
          margin: "6rem auto 0",
          padding: "0 20px"
        }}
      >
        <Timeline />
        {width > 1000 && <SidebarSection />}
      </div>
    </div>
  );
};

export default Dashboard;
