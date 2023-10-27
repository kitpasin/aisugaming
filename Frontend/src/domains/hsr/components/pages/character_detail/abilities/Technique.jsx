import { TechniqueDescriptionColor } from "../colors/TechniqueDescriptionColor"; 

function technique({ characters, techniques, elementColor }) {

  return (
    <div className="bg-[#1c1d21] border-[#33343a] border-[1px]">
      {techniques.map((technique, index) => (
        <div
          key={technique.id}
          className={`${index > 0 && "border-[#33343a] border-t-[1px]"}`}
        >
          <div className="bg-[#1c1d21] w-full h-[70px] flex justify-start items-center gap-4">
            <p
              style={{ backgroundColor: `${elementColor}` }}
              className="text-center p-4 w-full max-w-[125px] h-full flex justify-center items-center text-[#1c1d21] font-bold"
            >
              Technique {index > 0 && "(Enhanced)"}
            </p>
            <p className="flex flex-col justify-center h-full">
              <span className="capitalize">{technique?.technique_title}</span>
            </p>
          </div>
          <div className="bg-[#33343a] flex items-center w-full p-1 px-4 text-[16px]">
            <p className="w-1/2">
              <span className="opacity-50">Energy gain : </span>
              {technique?.technique_gain}
            </p>
            <p className="w-1/2">
              <span className="opacity-50">Break : </span>
              {technique?.technique_break}
            </p>
          </div>
          <div className="bg-[#1c1d21] p-4">
            {TechniqueDescriptionColor(
              characters,
              technique,
              elementColor
            )}
          </div>
        </div>
      ))}
    </div>
  );
}

export default technique;
