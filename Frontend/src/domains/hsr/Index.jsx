import { useEffect, useState } from "react";
import Sidebar from "./components/layouts/Sidebar";
import Header from "./components/layouts/Header";
import HomePage from "./components/pages/HomePage";
import TierListPage from "./components/pages/TierlistPage";
import { Route, Routes } from "react-router-dom";
import CharactersPage from "./components/pages/CharactersPage";
import CharacterDetailPage from "./components/pages/CharacterDetailPage";

function Index({ games, domain, bgImg }) {
  const [windowWidth, setWindowWidth] = useState(window.innerWidth || 0);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [selectedCharacter, setSelectedCharacter] = useState(0)

  function handleResize() {
    setWindowWidth(window.innerWidth);
  }

  useEffect(() => {
    window.addEventListener("resize", handleResize);
    () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  useEffect(() => {
    if (windowWidth <= 980) {
      setIsSidebarOpen(false);
    } else {
      setIsSidebarOpen(true);
    }
  }, [windowWidth]);

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
          <Route path="/characters" element={<CharactersPage domain={domain} setSelectedCharacter={setSelectedCharacter} />} />
          <Route path="/characters/*" element={<CharacterDetailPage selectedCharacter={selectedCharacter} />} />
        </Routes>
        
      </div>
    </div>
  );
}

export default Index;
