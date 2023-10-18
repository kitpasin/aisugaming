import MenuOpenRoundedIcon from "@mui/icons-material/MenuOpenRounded";

function Header({ isSidebarOpen, setIsSidebarOpen }) {
  return (
    <div className="bg-[#1c1d21] w-full h-full max-h-[70px] border-[#33343a] border-b-[1px] flex justify-between items-center gap-4 px-8 text-white font-bold">
      <div
        className={`${
          !isSidebarOpen && "scale-x-[-1]"
        } cursor-pointer transition-all ease-in-out duration-300`}
        onClick={() => setIsSidebarOpen(!isSidebarOpen)}
      >
        <MenuOpenRoundedIcon sx={{ fontSize: "32px" }} />
      </div>
      <p>Social</p>
    </div>
  );
}

export default Header;
