import MenuOpenRoundedIcon from "@mui/icons-material/MenuOpenRounded";
import FacebookRoundedIcon from "@mui/icons-material/FacebookRounded";
import TwitterIcon from '@mui/icons-material/Twitter';
import YouTubeIcon from '@mui/icons-material/YouTube';

function Header({ isSidebarOpen, setIsSidebarOpen, windowWidth }) {
  return (
    <div
      className={`${
        windowWidth <= 980 ? "justify-end" : "justify-between"
      } bg-[#1c1d21] w-full h-full max-h-[70px] border-[#33343a] border-b-[1px] flex items-center gap-4 px-8 text-white font-bold`}
    >
      <div
        className={`${!isSidebarOpen && "scale-x-[-1]"} ${
          windowWidth <= 980 && "hidden"
        } cursor-pointer transition-all ease-in-out duration-300`}
        onClick={() => setIsSidebarOpen(!isSidebarOpen)}
      >
        <MenuOpenRoundedIcon sx={{ fontSize: "32px" }} />
      </div>
      <div className="flex gap-2">
        <FacebookRoundedIcon sx={{ fontSize: "32px" }} />
        <TwitterIcon sx={{ fontSize: "32px" }} />
        <YouTubeIcon sx={{ fontSize: "32px" }} />
      </div>
    </div>
  );
}

export default Header;
