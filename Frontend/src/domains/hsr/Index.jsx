import React from "react";
import Sidebar from "./components/layouts/Sidebar";
import HomePage from "./components/pages/HomePage";

function Index() {
  return (
    <div className="relative w-full h-screen">
      <Sidebar />
      <HomePage />
    </div>
  );
}

export default Index;
