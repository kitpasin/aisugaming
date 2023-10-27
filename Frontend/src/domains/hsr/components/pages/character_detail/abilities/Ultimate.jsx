import { Slider } from "@mui/material";
import { useState } from "react";
import { UltimateDescriptionColor } from "../colors/UltimateDescriptionColor";

function Ultimate({ characters, ultimates, elementColor }) {
  const [ultimateLevel, setUltimateLevel] = useState(10);
  const [ultimateLevel2, setUltimateLevel2] = useState(10);
  const [ultimateLevel3, setUltimateLevel3] = useState(10);
  const [ultimateLevel4, setUltimateLevel4] = useState(10);

  return (
    <div className="bg-[#1c1d21] border-[#33343a] border-[1px]">
      {ultimates.map((ultimate, index) => (
        <div
          key={ultimate.id}
          className={`${index > 0 && "border-[#33343a] border-t-[1px]"}`}
        >
          <div className="bg-[#1c1d21] w-full h-[70px] flex justify-start items-center gap-4">
            <p
              style={{ backgroundColor: `${elementColor}` }}
              className="text-center p-4 w-full max-w-[125px] h-full flex justify-center items-center text-[#1c1d21] font-bold"
            >
              Ultimate {index > 0 && "(Enhanced)"}
            </p>
            <p className="flex flex-col justify-center h-full">
              <span className="capitalize">{ultimate?.ultimate_title}</span>
              <span className="text-[16px] opacity-50">
                {ultimate?.ultimate_type === 1
                  ? "Single Target"
                  : ultimate?.ultimate_type === 2
                  ? "Blast"
                  : ultimate?.ultimate_type === 3
                  ? "AoE"
                  : ultimate?.ultimate_type === 4
                  ? "Bounce"
                  : ultimate?.ultimate_type === 5
                  ? "Enhance"
                  : ultimate?.ultimate_type === 6 && "Support"}
                {" | "}
                {ultimate?.ultimate_cost} energy cost
              </span>
            </p>
          </div>
          <div className="bg-[#33343a] border-[#1c1d21] border-b-[1px] p-4 pr-8 flex justify-between items-center">
            <p className="w-full max-w-[70px]">
              Lv.
              <span style={{ color: `${elementColor}` }}>
                {" "}
                {index === 0
                  ? ultimateLevel
                  : index === 1
                  ? ultimateLevel2
                  : index === 2
                  ? ultimateLevel3
                  : ultimateLevel4}
              </span>
            </p>
            <Slider
              className="w-full"
              sx={{ color: `${elementColor}` }}
              valueLabelDisplay="auto"
              defaultValue={
                index === 0
                  ? ultimateLevel
                  : index === 1
                  ? ultimateLevel2
                  : index === 2
                  ? ultimateLevel3
                  : ultimateLevel4
              }
              step={1}
              min={1}
              max={12}
              marks
              value={
                index === 0
                  ? ultimateLevel
                  : index === 1
                  ? ultimateLevel2
                  : index === 2
                  ? ultimateLevel3
                  : ultimateLevel4
              }
              onChange={(event) => {
                index === 0
                  ? setUltimateLevel(event.target.value)
                  : index === 1
                  ? setUltimateLevel2(event.target.value)
                  : index === 2
                  ? setUltimateLevel3(event.target.value)
                  : setUltimateLevel4(event.target.value);
              }}
            />
          </div>
          <div className="bg-[#33343a] flex items-center w-full p-1 px-4 text-[16px]">
            <p className="w-1/2">
              <span className="opacity-50">Energy gain : </span>
              {ultimate?.ultimate_gain}
            </p>
            <p className="w-1/2">
              <span className="opacity-50">Break : </span>
              {ultimate?.ultimate_break}
            </p>
          </div>
          <div className="bg-[#1c1d21] p-4">
            {UltimateDescriptionColor(
              characters,
              ultimate,
              index === 0
                ? ultimateLevel
                : index === 1
                ? ultimateLevel2
                : index === 2
                ? ultimateLevel3
                : ultimateLevel4,
              elementColor
            )}
          </div>
        </div>
      ))}
    </div>
  );
}

export default Ultimate;
