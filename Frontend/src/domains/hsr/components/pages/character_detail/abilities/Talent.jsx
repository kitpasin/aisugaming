import { Slider } from "@mui/material";
import { useState } from "react";
import { TalentDescriptionColor } from "../colors/talentDescriptionColor";

function Talent({ characters, talents, elementColor }) {
  const [talentLevel, setTalentLevel] = useState(10);
  const [talentLevel2, setTalentLevel2] = useState(10);
  const [talentLevel3, setTalentLevel3] = useState(10);
  const [talentLevel4, setTalentLevel4] = useState(10);

  return (
    <div className="bg-[#1c1d21] border-[#33343a] border-[1px]">
      {talents.map((talent, index) => (
        <div
          key={talent.id}
          className={`${index > 0 && "border-[#33343a] border-t-[1px]"}`}
        >
          <div className="bg-[#1c1d21] w-full h-[70px] flex justify-start items-center gap-4">
            <p
              style={{ backgroundColor: `${elementColor}` }}
              className="text-center p-4 w-full max-w-[125px] h-full flex justify-center items-center text-[#1c1d21] font-bold"
            >
              Talent {index > 0 && "(Enhanced)"}
            </p>
            <p className="flex flex-col justify-center h-full">
              <span className="capitalize">{talent?.talent_title}</span>
              <span className="text-[16px] opacity-50">
                {talent?.talent_type === 1
                  ? "Single Target"
                  : talent?.talent_type === 2
                  ? "Blast"
                  : talent?.talent_type === 3
                  ? "AoE"
                  : talent?.talent_type === 4
                  ? "Bounce"
                  : talent?.talent_type === 5
                  ? "Enhance"
                  : talent?.talent_type === 6 && "Support"}
              </span>
            </p>
          </div>
          <div className="bg-[#33343a] border-[#1c1d21] border-b-[1px] p-4 pr-8 flex justify-between items-center">
            <p className="w-full max-w-[70px]">
              Lv.
              <span style={{ color: `${elementColor}` }}>
                {" "}
                {index === 0
                  ? talentLevel
                  : index === 1
                  ? talentLevel2
                  : index === 2
                  ? talentLevel3
                  : talentLevel4}
              </span>
            </p>
            <Slider
              className="w-full"
              sx={{ color: `${elementColor}` }}
              valueLabelDisplay="auto"
              defaultValue={
                index === 0
                  ? talentLevel
                  : index === 1
                  ? talentLevel2
                  : index === 2
                  ? talentLevel3
                  : talentLevel4
              }
              step={1}
              min={1}
              max={12}
              marks
              value={
                index === 0
                  ? talentLevel
                  : index === 1
                  ? talentLevel2
                  : index === 2
                  ? talentLevel3
                  : talentLevel4
              }
              onChange={(event) => {
                index === 0
                  ? setTalentLevel(event.target.value)
                  : index === 1
                  ? setTalentLevel2(event.target.value)
                  : index === 2
                  ? setTalentLevel3(event.target.value)
                  : setTalentLevel4(event.target.value);
              }}
            />
          </div>
          <div className="bg-[#33343a] flex items-center w-full p-1 px-4 text-[16px]">
            <p className="w-1/2">
              <span className="opacity-50">Energy gain : </span>
              {talent?.talent_gain}
            </p>
            <p className="w-1/2">
              <span className="opacity-50">Break : </span>
              {talent?.talent_break}
            </p>
          </div>
          <div className="bg-[#1c1d21] p-4">
            {TalentDescriptionColor(
              characters,
              talent,
              index === 0
                ? talentLevel
                : index === 1
                ? talentLevel2
                : index === 2
                ? talentLevel3
                : talentLevel4,
              elementColor
            )}
          </div>
        </div>
      ))}
    </div>
  );
}

export default Talent;
