import { useEffect, useState } from "react";
import { Route, Routes } from "react-router-dom";
import { PulseLoader } from "react-spinners";
import axios from "axios";
import HomePage from "./components/pages/HomePage";
import Index from "./domains/hsr";

function App() {
  const [loading, setLoading] = useState(true);
  const [games, setGames] = useState([]);
  const [bgImg, setBgImg] = useState("");

  async function getGames() {
    const response = await axios.get("http://localhost:3000/games/read");
    const data = response.data;
    setGames(data);
    setBgImg(data[0].image);
  }

  useEffect(() => {
    getGames().then(() => {
      setLoading(false);
    });
  }, []);

  return (
    <>
      {loading ? (
        <div className="fixed w-full h-screen">
          <PulseLoader color="#161616" />
        </div>
      ) : (
        <div className="relative w-full h-screen bg-[#1c1d21] z-0">
          {games.map((game) => (
            <div
              key={game.id}
              style={{
                backgroundImage: `linear-gradient(0deg, transparent 0%, #1c1d21), linear-gradient(180deg, transparent 0%, #1c1d21), url(/images/${game.image})`,
              }}
              className={`absolute top-0 bg-cover bg-center ${
                bgImg === game.image ? "opacity-1" : "opacity-0"
              } w-full h-full transition-all ease-in-out duration-1000 -z-10`}
            />
          ))}
            <Routes>
              <Route
                path="/"
                element={<HomePage games={games} setBgImg={setBgImg} />}
              />
              <Route
                path="/honkai-star-rail"
                element={<Index />}
              />
            </Routes>
        </div>
      )}
    </>
  );
}

export default App;
