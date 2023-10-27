import { Slider } from "@mui/material";
import { BasicDescriptionColor } from "../colors/BasicDescriptionColor";
import { useState } from "react";

function Basic({ characters, basics, elementColor }) {
  const [basicLevel, setBasicLevel] = useState(6);
  const [basicLevel2, setBasicLevel2] = useState(6);
  const [basicLevel3, setBasicLevel3] = useState(6);
  const [basicLevel4, setBasicLevel4] = useState(6);

  return (
    <div className="bg-[#1c1d21] border-[#33343a] border-[1px]">
      {basics.map((basic, index) => (
        <div
          key={basic.id}
          className={`${index > 0 && "border-[#33343a] border-t-[1px]"}`}
        >
          <div className="bg-[#1c1d21] w-full h-[70px] flex justify-start items-center gap-4">
            <p
              style={{ backgroundColor: `${elementColor}` }}
              className="text-center p-4 w-full max-w-[125px] h-full flex justify-center items-center text-[#1c1d21] font-bold"
            >
              Basic ATK {index > 0 && "(Enhanced)"}
            </p>
            <p className="flex flex-col justify-center h-full">
              <span className="capitalize">{basic?.basic_title}</span>
              <span className="text-[16px] opacity-50">
                {basic?.basic_type === 1
                  ? "Single Target"
                  : basic?.basic_type === 2
                  ? "Blast"
                  : "AoE"}
              </span>
            </p>
          </div>
          <div className="bg-[#33343a] border-[#1c1d21] border-b-[1px] p-4 pr-8 flex justify-between items-center">
            <p className="w-full max-w-[70px]">
              Lv.
              <span style={{ color: `${elementColor}` }}>
                {" "}
                {index === 0
                  ? basicLevel
                  : index === 1
                  ? basicLevel2
                  : index === 2
                  ? basicLevel3
                  : basicLevel4}
              </span>
            </p>
            <Slider
              className="w-full"
              sx={{ color: `${elementColor}` }}
              valueLabelDisplay="auto"
              defaultValue={
                index === 0
                  ? basicLevel
                  : index === 1
                  ? basicLevel2
                  : index === 2
                  ? basicLevel3
                  : basicLevel4
              }
              step={1}
              min={1}
              max={7}
              marks
              value={
                index === 0
                  ? basicLevel
                  : index === 1
                  ? basicLevel2
                  : index === 2
                  ? basicLevel3
                  : basicLevel4
              }
              onChange={(event) => {
                index === 0
                  ? setBasicLevel(event.target.value)
                  : index === 1
                  ? setBasicLevel2(event.target.value)
                  : index === 2
                  ? setBasicLevel3(event.target.value)
                  : setBasicLevel4(event.target.value);
              }}
            />
          </div>
          <div className="bg-[#33343a] flex items-center w-full p-1 px-4 text-[16px]">
            <p className="w-1/2">
              <span className="opacity-50">Energy gain : </span>
              {basic?.basic_gain}
            </p>
            <p className="w-1/2">
              <span className="opacity-50">Break : </span>
              {basic?.basic_break}
            </p>
          </div>
          <div className="bg-[#1c1d21] p-4">
            {BasicDescriptionColor(
              characters,
              basic,
              index === 0
                ? basicLevel
                : index === 1
                ? basicLevel2
                : index === 2
                ? basicLevel3
                : basicLevel4,
              elementColor
            )}
          </div>
        </div>
      ))}
    </div>
  );
}

export default Basic;
