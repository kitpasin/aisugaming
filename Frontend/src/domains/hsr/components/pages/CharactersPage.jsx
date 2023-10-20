import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import axios from "axios";
import CloseIcon from "@mui/icons-material/Close";
import StarIcon from "@mui/icons-material/Star";

function CharactersPage({ domain, setSelectedCharacter }) {
  const location = useLocation();
  const [characters, setCharacters] = useState([]);
  const [stars, setStars] = useState([]);
  const [elements, setElements] = useState([]);
  const [paths, setPaths] = useState([]);
  const [searchResult, setSearchResult] = useState("");
  const [selectedStar, setSelectedStar] = useState(0);
  const [selectedElement, setSelectedElement] = useState(0);
  const [selectedPath, setSelectedPath] = useState(0);

  const filteredCharacter = characters.filter((character) => {
    const matchesSearch = searchResult
      ? character.name.includes(searchResult)
      : true;
    const matchesStar = selectedStar
      ? character.star_id === selectedStar
      : true;
    const matchesElement = selectedElement
      ? character.element_id === selectedElement
      : true;
    const matchesPath = selectedPath
      ? character.path_id === selectedPath
      : true;
    return matchesSearch && matchesStar && matchesElement && matchesPath;
  });

  async function getCharacters() {
    const response = await axios.get("http://localhost:3000/characters/read");
    const data = response.data;
    setCharacters(data);
  }

  async function getStars() {
    const response = await axios.get("http://localhost:3000/stars/read");
    const data = response.data;
    setStars(data);
  }

  async function getElements() {
    const response = await axios.get("http://localhost:3000/elements/read");
    const data = response.data;
    setElements(data);
  }

  async function getPaths() {
    const response = await axios.get("http://localhost:3000/paths/read");
    const data = response.data;
    setPaths(data);
  }

  function resetFilter() {
    setSearchResult("");
    setSelectedStar(0);
    setSelectedElement(0);
    setSelectedPath(0);
  }

  useEffect(() => {
    getCharacters();
    getStars();
    getElements();
    getPaths();
  }, []);

  return (
    <div className="w-full p-8 overflow-y-auto">
      <div className="w-full max-w-[1536px] m-auto text-white text-xl font-bold">
        <div className="flex gap-2 capitalize max-md:text-[16px] max-xs:text-sm">
          <Link
            className="opacity-50 hover:opacity-100 transition-all ease-in-out duration-300 flex-none"
            to="/honkai-star-rail"
          >
            {domain}
          </Link>
          /<p>{location.pathname.split("/")[2]}</p>
        </div>
        <div className="mt-12 capitalize border-b-[1px] border-[#33343a] w-full flex items-center gap-4 max-md:text-[16px] max-xs:text-sm">
          <p className="border-b-[5px] w-fit">
            {location.pathname.split("/")[2]}
          </p>
          <p className="mb-[5px] opacity-50">
            Showing {filteredCharacter.length} {location.pathname.split("/")[2]}
          </p>
        </div>
        <div className="mt-4 w-full flex flex-row max-xs:flex-col justify-start items-center max-xs:items-start gap-4 max-2xl:flex-wrap">
          <div className="relative text-black text-[18px] font-normal w-full">
            <input
              type="text"
              placeholder="Search Characters..."
              value={searchResult}
              onChange={(event) => setSearchResult(event.target.value)}
              className="w-full h-[45px] pl-2 pr-10 border-[1px] border-[#33343a]"
            />
            <div className="cursor-pointer" onClick={() => setSearchResult("")}>
              <CloseIcon
                sx={{
                  position: "absolute",
                  top: 6,
                  right: 4,
                  fontSize: "32px",
                }}
              />
            </div>
          </div>
          <div className="grid grid-cols-3 w-full max-w-[150px] text-[18px]">
            <div
              onClick={() => setSelectedStar(0)}
              className={`${
                selectedStar === 0
                  ? "bg-[#33343a] border-[#fff]"
                  : "bg-[#1c1d21] border-[#33343a]"
              } flex justify-center items-center w-full max-w-[50px] h-[45px] border-[1px] cursor-pointer transition-all ease-in-out duration-300`}
            >
              <p className="pt-2 text-4xl">*</p>
            </div>
            {stars.map((star, index) => (
              <div
                className={`${
                  index === 0 ? "text-[#8a5fcc]" : "text-[#c9a36a]"
                } ${
                  selectedStar === star.id
                    ? "bg-[#33343a] border-[#fff]"
                    : "bg-[#1c1d21] border-[#33343a]"
                } hover:bg-[#33343a] flex justify-center items-center w-full max-w-[50px] h-[45px] border-[1px] cursor-pointer transition-all ease-in-out duration-300`}
                key={star.id}
                value={selectedStar}
                onClick={() => setSelectedStar(star.id)}
              >
                <p>{star.title.replace("star", "")}</p>
                <StarIcon sx={{ fontSize: "18px" }} />
              </div>
            ))}
          </div>
          <div className="grid grid-cols-8 max-xs:grid-cols-4 w-full max-w-[400px] max-xs:max-w-[200px] text-[18px]">
            <div
              onClick={() => setSelectedElement(0)}
              className={`${
                selectedElement === 0
                  ? "bg-[#33343a] border-[#fff]"
                  : "bg-[#1c1d21] border-[#33343a]"
              } flex justify-center items-center w-full max-w-[50px] h-[45px] border-[1px] cursor-pointer transition-all ease-in-out duration-300`}
            >
              <p className="pt-2 text-4xl">*</p>
            </div>
            {elements.map((element) => (
              <div
                className={`${
                  selectedElement === element.id
                    ? "bg-[#33343a] border-[#fff]"
                    : "bg-[#1c1d21] border-[#33343a]"
                } hover:bg-[#33343a] flex justify-center items-center w-full max-w-[50px] h-[45px] border-[1px] cursor-pointer transition-all ease-in-out duration-300`}
                key={element.id}
                value={selectedElement}
                onClick={() => setSelectedElement(element.id)}
              >
                <p>{element.title}</p>
                <img
                  className="w-full p-2"
                  src={`/images/elements/${element.image}`}
                  alt={element.title}
                />
              </div>
            ))}
          </div>
          <div className="grid grid-cols-8 max-xs:grid-cols-4 w-full max-w-[400px] max-xs:max-w-[200px] text-[18px]">
            <div
              onClick={() => setSelectedPath(0)}
              className={`${
                selectedPath === 0
                  ? "bg-[#33343a] border-[#fff]"
                  : "bg-[#1c1d21] border-[#33343a]"
              } flex justify-center items-center w-full max-w-[50px] h-[45px] border-[1px] cursor-pointer transition-all ease-in-out duration-300`}
            >
              <p className="pt-2 text-4xl">*</p>
            </div>
            {paths.map((path) => (
              <div
                className={`${
                  selectedPath === path.id
                    ? "bg-[#33343a] border-[#fff]"
                    : "bg-[#1c1d21] border-[#33343a]"
                } hover:bg-[#33343a] flex justify-center items-center w-full max-w-[50px] h-[45px] border-[1px] cursor-pointer transition-all ease-in-out duration-300`}
                key={path.id}
                value={selectedPath}
                onClick={() => setSelectedPath(path.id)}
              >
                <p>{path.title}</p>
                <img
                  className="w-full p-2"
                  src={`/images/paths/${path.image}`}
                  alt={path.title}
                />
              </div>
            ))}
          </div>
          <div className="w-auto flex">
            <div
              onClick={resetFilter}
              className="bg-red-700 border-[1px] border-[#33343a] hover:border-[#fff] w-[50px] h-[45px] p-2 flex justify-center items-center text-[18px] gap-1 cursor-pointer transition-all ease-in-out duration-300"
            >
              <CloseIcon />
            </div>
          </div>
        </div>
        <div className="mt-4 grid grid-cols-8 max-2xl:grid-cols-7 max-xl:grid-cols-6 max-lg:grid-cols-5 max-md:grid-cols-4 max-sm:grid-cols-3 max-xs:grid-cols-2 max-mn:grid-cols-1 gap-4">
          {filteredCharacter.map((character) => (
            <Link
              onClick={() => setSelectedCharacter(character.id)}
              key={character.id}
              to={character.url}
              className={`${
                character.star_id === 1
                  ? "bg-gradient-to-b from-[#885550] to-[#c9a36a]"
                  : "bg-gradient-to-b from-[#343659] to-[#8a5fcc]"
              } w-auto cursor-pointer overflow-hidden border-[1px] border-[#33343a] relative`}
            >
              <img
                className="hover:scale-110 transition-all ease-in-out duration-500"
                src={`/images/characters/${character.image}`}
                alt={character.name}
              />
              <figure className="bg-[#1c1d21] bg-opacity-75 absolute top-0 left-0 m-1 p-1 rounded-full">
                <img
                  className="w-[30px] h-[30px]"
                  src={`/images/elements/${character.element_image}`}
                  alt={character.element_name}
                />
              </figure>
              <p
                style={{ textShadow: "1px 3px 3px #000" }}
                className="absolute bottom-2 w-full text-center capitalize text-[18px]"
              >
                {character.name}
              </p>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}

export default CharactersPage;
