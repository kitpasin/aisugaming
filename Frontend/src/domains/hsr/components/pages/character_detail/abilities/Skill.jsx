import { Slider } from "@mui/material";
import { useState } from "react";
import { SkillDescriptionColor } from "../colors/SkillDescriptionColor";

function Skill({ characters, skills, elementColor }) {
  const [skillLevel, setSkillLevel] = useState(10);
  const [skillLevel2, setSkillLevel2] = useState(10);
  const [skillLevel3, setSkillLevel3] = useState(10);
  const [skillLevel4, setSkillLevel4] = useState(10);

  return (
    <div className="bg-[#1c1d21] border-[#33343a] border-[1px]">
      {skills.map((skill, index) => (
        <div
          key={skill.id}
          className={`${index > 0 && "border-[#33343a] border-t-[1px]"}`}
        >
          <div className="bg-[#1c1d21] w-full h-[70px] flex justify-start items-center gap-4">
            <p
              style={{ backgroundColor: `${elementColor}` }}
              className="text-center p-4 w-full max-w-[125px] h-full flex justify-center items-center text-[#1c1d21] font-bold"
            >
              Skill {index > 0 && "(Enhanced)"}
            </p>
            <p className="flex flex-col justify-center h-full">
              <span className="capitalize">{skill?.skill_title}</span>
              <span className="text-[16px] opacity-50">
                {skill?.skill_type === 1
                  ? "Single Target"
                  : skill?.skill_type === 2
                  ? "Blast"
                  : skill?.skill_type === 3
                  ? "AoE"
                  : skill?.skill_type === 4
                  ? "Bounce"
                  : skill?.skill_type === 5
                  ? "Enhance"
                  : skill?.skill_type === 6 && "Support"}
              </span>
            </p>
          </div>
          <div className="bg-[#33343a] border-[#1c1d21] border-b-[1px] p-4 pr-8 flex justify-between items-center">
            <p className="w-full max-w-[70px]">
              Lv.
              <span style={{ color: `${elementColor}` }}>
                {" "}
                {index === 0
                  ? skillLevel
                  : index === 1
                  ? skillLevel2
                  : index === 2
                  ? skillLevel3
                  : skillLevel4}
              </span>
            </p>
            <Slider
              className="w-full"
              sx={{ color: `${elementColor}` }}
              valueLabelDisplay="auto"
              defaultValue={
                index === 0
                  ? skillLevel
                  : index === 1
                  ? skillLevel2
                  : index === 2
                  ? skillLevel3
                  : skillLevel4
              }
              step={1}
              min={1}
              max={12}
              marks
              value={
                index === 0
                  ? skillLevel
                  : index === 1
                  ? skillLevel2
                  : index === 2
                  ? skillLevel3
                  : skillLevel4
              }
              onChange={(event) => {
                index === 0
                  ? setSkillLevel(event.target.value)
                  : index === 1
                  ? setSkillLevel2(event.target.value)
                  : index === 2
                  ? setSkillLevel3(event.target.value)
                  : setSkillLevel4(event.target.value);
              }}
            />
          </div>
          <div className="bg-[#33343a] flex items-center w-full p-1 px-4 text-[16px]">
            <p className="w-1/2">
              <span className="opacity-50">Energy gain : </span>
              {skill?.skill_gain}
            </p>
            <p className="w-1/2">
              <span className="opacity-50">Break : </span>
              {skill?.skill_break}
            </p>
          </div>
          <div className="bg-[#1c1d21] p-4">
            {SkillDescriptionColor(
              characters,
              skill,
              index === 0
                ? skillLevel
                : index === 1
                ? skillLevel2
                : index === 2
                ? skillLevel3
                : skillLevel4,
              elementColor
            )}
          </div>
        </div>
      ))}
    </div>
  );
}

export default Skill;
