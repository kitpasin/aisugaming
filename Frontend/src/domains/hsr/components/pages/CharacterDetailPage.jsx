import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import Aos from "aos";
import "aos/dist/aos.css";
import { Slider } from "@mui/material";

function CharacterDetailPage({ domain }) {
  const location = useLocation();
  const [characterDetail, setCharacterDetail] = useState([]);
  const [starColor, setStarColor] = useState("")
  const [elementColor, setElementColor] = useState("");
  const [elementBackground, setElementBackground] = useState("");
  const [pathColor, setPathColor] = useState("");
  const [basicLevel, setBasicLevel] = useState(1);

  async function getCharacterDetail() {
    const response = await axios.get(
      `http://localhost:3000/character/read/${location.pathname.split("/")[3]}`
    );
    const data = response.data;
    setCharacterDetail(data);
  }

  function getStarColor() {
    if (characterDetail[0]?.star_id === 1) {
      setStarColor("#c9a36a")
    } else {
      setStarColor("#8a5fcc")
    }
  }

  function getElementColorAndElementBackgroundColor() {
    if (characterDetail[0]?.element_id === 1) {
      setElementColor("#979797");
      setElementBackground("linear-gradient(125deg, transparent 50%, #979797)");
    } else if (characterDetail[0]?.element_id === 2) {
      setElementColor("#ee473d");
      setElementBackground("linear-gradient(125deg, transparent 50%, #ee473d)");
    } else if (characterDetail[0]?.element_id === 3) {
      setElementColor("#2692d3");
      setElementBackground("linear-gradient(125deg, transparent 50%, #2692d3)");
    } else if (characterDetail[0]?.element_id === 4) {
      setElementColor("#8a5fcc");
      setElementBackground("linear-gradient(125deg, transparent 50%, #8a5fcc)");
    } else if (characterDetail[0]?.element_id === 5) {
      setElementColor("#61cf93");
      setElementBackground("linear-gradient(125deg, transparent 50%, #61cf93)");
    } else if (characterDetail[0]?.element_id === 6) {
      setElementColor("#7e74eb");
      setElementBackground("linear-gradient(125deg, transparent 50%, #7e74eb)");
    } else {
      setElementColor("#e6d863");
      setElementBackground("linear-gradient(125deg, transparent 50%, #e6d863)");
    }
  }

  function getPathColor() {
    if (characterDetail[0]?.path_id === 1) {
      setPathColor("#61cf93");
    } else if (characterDetail[0]?.path_id === 2) {
      setPathColor("#e6d863");
    } else if (characterDetail[0]?.path_id === 3) {
      setPathColor("#8a5fcc");
    } else if (characterDetail[0]?.path_id === 4) {
      setPathColor("#2692d3");
    } else if (characterDetail[0]?.path_id === 5) {
      setPathColor("#6191f6");
    } else if (characterDetail[0]?.path_id === 6) {
      setPathColor("#6191f6");
    } else {
      setPathColor("#e2a43d");
    }
  }

  function changeCharacterDetailColor(characterDetail) {
    const detail = characterDetail[0]?.detail;

    if (detail) {
      const modifiedNameColor = detail.replace(
        "Arlan",
        `<span style="color: ${elementColor}">Arlan</span>`
      );
      const modifiedStarColor = modifiedNameColor.replace(
        "4★",
        `<span style="color: ${starColor}">4★</span>`
      );
      const modifiedpathColor = modifiedStarColor.replace(
        "Path of Destruction",
        `<span style="color: ${pathColor}">Path of Destruction</span>`
      );
      return <p dangerouslySetInnerHTML={{ __html: modifiedpathColor }} />;
    } else {
      return <p>Error: Description or level value not found</p>;
    }
  }

  function changeBasicDescirptionColor(characterDetail, basicLevel) {
    const basicLevelKey = `basic_level_${basicLevel}`;
    const description = characterDetail[0]?.basic_description;
    const levelValue = characterDetail[0]?.[basicLevelKey];

    if (description && levelValue) {
      const modifiedWordColor = description.replace(
        "Lightning DMG",
        `<span style="color: ${elementColor}">Lightning DMG</span>`
      );
      const modifiedDescriptionColor = modifiedWordColor.replace(
        "%",
        `<span style="color: ${elementColor}">${levelValue}%</span>`
      );
      return <p dangerouslySetInnerHTML={{ __html: modifiedDescriptionColor }} />;
    } else {
      return <p>Error: Description or level value not found</p>;
    }
  }

  useEffect(() => {
    getCharacterDetail();
  }, []);

  useEffect(() => {
    getStarColor();
    getElementColorAndElementBackgroundColor();
    getPathColor();
  }, [characterDetail]);

  useEffect(() => {
    Aos.init();
  }, []);

  console.log(basicLevel);

  return (
    <div className="w-full p-8 overflow-x-hidden overflow-y-auto">
      <div className="w-full max-w-[1536px] m-auto text-white text-xl font-bold">
        <div
          data-aos="fade-down"
          data-aos-duration="1000"
          className="flex gap-2 capitalize max-md:text-[16px] max-xs:text-sm"
        >
          <Link
            className="opacity-50 hover:opacity-100 transition-all ease-in-out duration-300 flex-none"
            to="/honkai-star-rail"
          >
            {domain}
          </Link>
          /
          <Link
            to="/honkai-star-rail/characters"
            className="opacity-50 hover:opacity-100 transition-all ease-in-out duration-300 flex-none"
          >
            {location.pathname.split("/")[2]}
          </Link>
          /<p>{characterDetail[0]?.name}</p>
        </div>
        <div
          data-aos="fade-up"
          data-aos-duration="1000"
          style={{
            backgroundImage: `linear-gradient(270deg, transparent 50%, #161616), linear-gradient(90deg, transparent 50%, #161616), url(/images/character-detail/character-detail_main-bg.png)`,
          }}
          className="bg-cover bg-bottom mt-12 capitalize w-full h-[250px] flex justify-between items-center max-md:text-[16px] max-xs:text-sm"
        >
          <div
            data-aos="fade-right"
            data-aos-duration="1000"
            className="w-full flex flex-col justify-center h-full gap-4 p-8"
          >
            <p className="opacity-50">{domain}</p>
            <p className={`text-[${elementColor}] text-6xl`}>
              {characterDetail[0]?.name}
            </p>
            <p>build and guide</p>
          </div>
          <figure
            style={{
              backgroundImage: `${elementBackground}`,
            }}
            className="w-full h-full flex justify-end items-center p-8"
          >
            <img
              data-aos="fade-left"
              data-aos-duration="1000"
              className="w-[200px]"
              src={`/images/characters/${characterDetail[0]?.image}`}
              alt={characterDetail[0]?.name}
            />
          </figure>
        </div>
        <div
          data-aos="fade-right"
          data-aos-duration="1000"
          className="mt-12 w-full flex flex-col gap-4"
        >
          <div className="border-b-[1px]">
            <p className="border-b-[5px] w-fit">Detail</p>
          </div>
          <p>
            {changeCharacterDetailColor(characterDetail)}
          </p>
        </div>
        <div
          data-aos="fade-right"
          data-aos-duration="1000"
          className="mt-12 w-full flex flex-col gap-4"
        >
          <div className="border-b-[1px]">
            <p className="border-b-[5px] w-fit">Skills</p>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="border-[#33343a] border-[1px]">
              <div className="bg-[#1c1d21] w-full h-[70px] flex justify-start items-center gap-4">
                <p
                  style={{ backgroundColor: `${elementColor}` }}
                  className="p-4 h-full flex justify-center items-center"
                >
                  Basic ATK
                </p>
                <p className="flex flex-col justify-center text-[18px] h-full">
                  <span className="capitalize">
                    {characterDetail[0]?.basic_title}
                  </span>
                  <span className="text-[16px] opacity-50">
                    {characterDetail[0]?.basic_type === 1
                      ? "Single Target"
                      : characterDetail[0]?.basic_type === 2
                      ? "Blast"
                      : "AoE"}
                  </span>
                </p>
              </div>
              <div className="bg-[#33343a] border-[#1c1d21] border-b-[1px] p-4 pr-8 flex justify-between items-center">
                <p className="w-full max-w-[70px]">Lv.{basicLevel}</p>
                <Slider
                  className="w-full"
                  sx={{ color: `${elementColor}` }}
                  valueLabelDisplay="auto"
                  defaultValue={basicLevel}
                  step={1}
                  min={1}
                  max={7}
                  marks
                  value={basicLevel}
                  onChange={(event) => setBasicLevel(event.target.value)}
                />
              </div>
              <div className="bg-[#33343a] flex items-center w-full p-1 px-4 text-[16px]">
                <p className="w-1/2">
                  <span className="opacity-50">Energy gain : </span>
                  {characterDetail[0]?.basic_gain}
                </p>
                <p className="w-1/2">
                  <span className="opacity-50">Break : </span>
                  {characterDetail[0]?.basic_break}
                </p>
              </div>
              <div className="bg-[#1c1d21] p-4 text-[18px]">
                <p>
                  {changeBasicDescirptionColor(characterDetail, basicLevel)}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CharacterDetailPage;
