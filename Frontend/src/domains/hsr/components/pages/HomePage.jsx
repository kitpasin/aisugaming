import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import axios from "axios";

function HomePage({ domain }) {
  const location = useLocation();
  const [contents, setContents] = useState([]);

  async function getContents() {
    const response = await axios.get("http://localhost:3000/contents/read");
    const data = response.data;
    setContents(data);
  }

  useEffect(() => {
    getContents();
  }, []);

  return (
    <div className="w-full max-w-[1280px] h-full m-auto p-8 text-white text-xl font-bold overflow-y-auto">
      <p>{domain}</p>
      <div className="mt-8 w-full text-[18px]">
        <div className="border-b-[1px] border-[#33343a] w-full">
          <p className="border-b-[5px] w-fit">New content</p>
        </div>
        <div className="grid grid-cols-2 xl:grid-cols-3 gap-4 mt-4">
          {contents.map((content) => (
            <div key={content.id} className="flex flex-col gap-1">
              <p>{content.description}</p>
              <Link
                to={`${location.pathname}${content.url}`}
                className="flex flex-col gap-1 relative"
              >
                <figure className="rounded-md overflow-hidden cursor-pointer">
                  <img
                    className="rounded-md scale-105 hover:scale-125 transition-all ease-in-out duration-300"
                    src={`images/${content.image}`}
                    alt={content.title}
                  />
                </figure>
                <div className="absolute bottom-0 left-0 bg-black bg-opacity-70 rounded-b-md w-full h-auto px-4 py-1 text-center">
                  <p>{content.title}</p>
                </div>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default HomePage;
