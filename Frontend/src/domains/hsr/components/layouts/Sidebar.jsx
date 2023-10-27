import { Link, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { Backdrop, Box, Fade, Modal } from "@mui/material";
import { SidebarMenu } from "../../data/SidebarMenu";
import MenuOpenRoundedIcon from "@mui/icons-material/MenuOpenRounded";
import CloseIcon from "@mui/icons-material/Close";

function Sidebar({ isSidebarOpen, games, domain, bgImg }) {
  const [isGamesModalOpen, setIsGamesModalOpen] = useState(false);
  const [gamesModalBgImg, setGamesModalBgImg] = useState("");
  const location = useLocation();

  function handleGamesModalOpen() {
    setIsGamesModalOpen(true);
  }
  function handleGamesModalClose() {
    setIsGamesModalOpen(false);
    setGamesModalBgImg(bgImg);
  }

  useEffect(() => {
    setGamesModalBgImg(bgImg);
  }, []);

  return (
    <div
      className={`relative bg-[#1c1d21] flex-none w-full ${
        isSidebarOpen ? "max-w-[250px]" : "max-w-[70px]"
      } border-[#33343a] border-r-[1px] h-screen text-white text-xl font-bold overflow-hidden transition-all ease-in-out duration-300`}
    >
      <Link
        to="/"
        className={`w-full h-full max-h-[70px] border-[#33343a] border-b-[1px] ${
          isSidebarOpen
            ? "text-xl transition-all ease-in duration-300"
            : "text-[0px] transition-all ease-out duration-300"
        } flex-none flex justify-center items-center`}
      >
        AISU GAMING
      </Link>
      <figure
        style={{
          backgroundImage: `linear-gradient(270deg, transparent 0%, #161616), linear-gradient(90deg, transparent 50%, #161616), url(/images/games/${bgImg})`,
        }}
        className="relative w-full h-full max-h-[70px] bg-cover bg-center flex justify-between items-center gap-4 px-4"
      >
        <p
          className={`${
            isSidebarOpen
              ? "text-[18px] transition-all ease-in duration-300"
              : "text-[0px] transition-all ease-out duration-100"
          }`}
        >
          {domain}
        </p>
        <div
          onClick={handleGamesModalOpen}
          className={`${
            !isSidebarOpen &&
            "absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
          } scale-x-[-1] cursor-pointer`}
        >
          <MenuOpenRoundedIcon sx={{ fontSize: "32px" }} />
        </div>
      </figure>
      <Modal
        open={isGamesModalOpen}
        onClose={handleGamesModalClose}
        closeAfterTransition
        slots={{ backdrop: Backdrop }}
        slotProps={{
          backdrop: {
            timeout: 300,
          },
        }}
      >
        <Fade in={isGamesModalOpen}>
          <Box className="relative bg-[#1c1d21] bg-cover bg-center top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 p-4 w-full max-w-[720px] h-full max-h-[480px] rounded-md border-[#33343a] border-[1px] overflow-y-auto text-white text-xl font-bold">
            {games.map((game) => (
              <div
                key={game.id}
                style={{
                  backgroundImage: `linear-gradient(0deg, transparent 0%, #161616), linear-gradient(180deg, transparent 0%, #161616), url(/images/games/${game.image})`,
                }}
                className={`absolute top-0 left-0 bg-cover bg-center ${
                  gamesModalBgImg === game.image ? "opacity-1" : "opacity-0"
                } w-full h-full rounded-md transition-all ease-in-out duration-500 -z-10`}
              />
            ))}
            <p>Quick switch to another game.</p>
            <div
              onClick={handleGamesModalClose}
              className="absolute top-4 right-4 cursor-pointer"
            >
              <CloseIcon sx={{ fontSize: "32px" }} />
            </div>
            <div className="grid grid-cols-3 gap-4 mt-8 w-full">
              {games.map((game) => (
                <Link
                  onMouseOver={() => setGamesModalBgImg(game.image)}
                  onClick={handleGamesModalClose}
                  to={game.url}
                  key={game.id}
                  className="flex flex-col text-center gap-2"
                >
                  <figure className="rounded-md overflow-hidden">
                    <img
                      className="rounded-md cursor-pointer hover:scale-125 transition-all ease-in-out duration-300"
                      src={`/images/games/${game.image}`}
                      alt={game.title}
                    />
                  </figure>
                  <p>{game.title}</p>
                </Link>
              ))}
            </div>
          </Box>
        </Fade>
      </Modal>
      <div className="flex flex-col text-[18px]">
        {SidebarMenu.map((menu) => (
          <Link
            to={menu.url}
            key={menu.id}
            className={`relative w-full h-[60px] ${
              isSidebarOpen
                ? "text-[18px] transition-all ease-in duration-300"
                : "text-[0px] transition-all ease-out duration-100 pl-[23px]"
            } flex items-center gap-4 p-4`}
          >
            {menu.icon}
            {isSidebarOpen && menu.title}
            <div
              className={`${
                location.pathname === menu.url &&
                "absolute top-0 left-0 bg-white w-[5px] h-full"
              } `}
            />
          </Link>
        ))}
      </div>
    </div>
  );
}

export default Sidebar;
