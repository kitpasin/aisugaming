import { useState } from "react";
import Sidebar from "./components/layouts/Sidebar";
import Header from "./components/layouts/Header";
import HomePage from "./components/pages/HomePage";
import TierListPage from "./components/pages/TierlistPage";
import { Route, Routes } from "react-router-dom";

function Index({ games, domain, bgImg }) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  return (
    <div className="relative w-full h-screen flex justify-between items-center">
      <Sidebar
        isSidebarOpen={isSidebarOpen}
        games={games}
        domain={domain}
        bgImg={bgImg}
      />
      <div className="w-full h-screen flex flex-col">
        <Header
          isSidebarOpen={isSidebarOpen}
          setIsSidebarOpen={setIsSidebarOpen}
        />
        <Routes>
          <Route path="/" element={<HomePage domain={domain} />} />
          <Route path="/tier-list" element={<TierListPage />} />
        </Routes>
        
      </div>
    </div>
  );
}

export default Index;
