import React from "react";
import Header from "../Components/Header/Header";
import Timeline from "../Components/timeline/Timeline";
import  Sidebar  from "../Components";
import { usingWindowSize } from '../Hooks/UsingWindowSize';

const Dashboard = () => {
  const { width } = usingWindowSize();

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
        {width > 1000 && <Sidebar />}
      </div>
    </div>
  );
};

export default Dashboard;
