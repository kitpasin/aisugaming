import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { PulseLoader } from "react-spinners";
import { DetailColor } from "./colors/DetailColor";
import axios from "axios";
import Basic from "./abilities/Basic";
import Aos from "aos";
import "aos/dist/aos.css";
import { getStarColor } from "./colors/StarColor";
import { getElementColor } from "./colors/ElementColor";
import { getPathColor } from "./colors/PathColor";
import Skill from "./abilities/Skill";
import Ultimate from "./abilities/Ultimate";
import Talent from "./abilities/Talent";
import Technique from "./abilities/Technique";
import {
  svCharacter,
  svBasic,
  svSkill,
  svUltimate,
  svTalent,
  svTechnique,
} from './service/Api';

function CharacterDetailPage({ domain }) {
  const location = useLocation();
  const [loading, setLoading] = useState(true);
  const [characters, setCharacters] = useState([]);
  const [basics, setBasics] = useState([]);
  const [skills, setSkills] = useState([]);
  const [ultimates, setUltimates] = useState([]);
  const [talents, setTalents] = useState([]);
  const [techniques, setTechniques] = useState([]);
  const [starColor, setStarColor] = useState("");
  const [elementColor, setElementColor] = useState(
    "                                                                                             "
  );
  const [elementBackground, setElementBackground] = useState("");
  const [pathColor, setPathColor] = useState("");

  async function fetchData() {
    try {
      const characterData = await svCharacter(location.pathname.split('/')[3]);
      const basicData = await svBasic(location.pathname.split('/')[3]);
      const skillData = await svSkill(location.pathname.split('/')[3]);
      const ultimateData = await svUltimate(location.pathname.split('/')[3]);
      const talentData = await svTalent(location.pathname.split('/')[3]);
      const techniqueData = await svTechnique(location.pathname.split('/')[3]);

      setCharacters(characterData);
      setBasics(basicData);
      setSkills(skillData);
      setUltimates(ultimateData);
      setTalents(talentData);
      setTechniques(techniqueData);
      setLoading(false);
    } catch (error) {
      console.error(error);
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    Aos.init();
  }, []);

  useEffect(() => {
    if (characters.length == 0) {
      setLoading(true);
    } else {
      setLoading(false);
    }
  }, [characters]);

  useEffect(() => {
    getStarColor(characters, setStarColor);
    getElementColor(characters, setElementColor, setElementBackground);
    getPathColor(characters, setPathColor);
  }, [characters]);

  return (
    <>
      {loading ? (
        <div className="w-full h-full flex justify-center items-center">
          <PulseLoader color="#fff" />
        </div>
      ) : (
        <div className="w-full p-8 overflow-x-hidden overflow-y-auto">
          <div className="w-full max-w-[1536px] m-auto text-white text-xl font-bold">
            <div
              data-aos="fade-down"
              data-aos-duration="1000"
              className="flex gap-2 capitalize max-md:text-[16px] max-xs:text-sm"
            >
              <Link
                to="/honkai-star-rail"
                className="opacity-50 hover:opacity-100 transition-all ease-in-out duration-300 flex-none"
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
              /<p>{characters[0]?.name}</p>
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
                className="w-[60%] flex flex-col justify-center h-full gap-4 p-8"
              >
                <p className="opacity-50">{domain}</p>
                <p style={{ color: `${elementColor}` }} className="text-6xl">
                  {characters[0]?.name}
                </p>
                <p>build and guide</p>
              </div>
              <figure
                style={{
                  backgroundImage: `${elementBackground}`,
                }}
                className="w-[40%] h-full flex justify-end items-center p-8"
              >
                <img
                  data-aos="fade-left"
                  data-aos-duration="1000"
                  className="w-[200px]"
                  src={`/images/characters/${characters[0]?.image}`}
                  alt={characters[0]?.name}
                />
              </figure>
            </div>
            <div className="mt-12 w-full flex flex-col gap-4">
              <div
                data-aos="fade-right"
                data-aos-duration="1000"
                className="border-b-[1px]"
              >
                <p className="border-b-[5px] w-fit">Detail</p>
              </div>
              <div data-aos="fade-up" data-aos-duration="1000" className="font-normal text-[18px]">
                {DetailColor(characters, elementColor, starColor, pathColor)}
              </div>
            </div>
            <div className="mt-12 w-full flex flex-col gap-4">
              <div
                data-aos="fade-right"
                data-aos-duration="1000"
                className="border-b-[1px]"
              >
                <p className="border-b-[5px] w-fit">Abilities</p>
              </div>
              <div
                data-aos="fade-up"
                data-aos-duration="1000"
                className="grid grid-cols-2 gap-4 font-normal text-[18px]"
              >
                <Basic
                  characters={characters}
                  basics={basics}
                  elementColor={elementColor}
                />
                <Skill
                  characters={characters}
                  skills={skills}
                  elementColor={elementColor}
                />
                <Ultimate
                  characters={characters}
                  ultimates={ultimates}
                  elementColor={elementColor}
                />
                <Talent
                  characters={characters}
                  talents={talents}
                  elementColor={elementColor}
                />
                <Technique
                  characters={characters}
                  techniques={techniques}
                  elementColor={elementColor}
                />
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default CharacterDetailPage;
