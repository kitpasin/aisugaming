import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import axios from "axios";
import Aos from "aos";
import "aos/dist/aos.css";

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

  useEffect(() => {
    Aos.init();
  }, []);

  return (
    <div className="w-full p-8 overflow-x-hidden overflow-y-auto">
      <div className="w-full max-w-[1536px] h-full m-auto text-white text-xl font-bold overflow-y-auto">
        <p data-aos="fade-down" data-aos-duration="1000">
          {domain}
        </p>
        <div className="mt-12 w-full text-[18px]">
          <div
            data-aos="fade-right"
            data-aos-duration="1000"
            className="border-b-[1px] border-[#33343a] w-full"
          >
            <p className="border-b-[5px] w-fit">New Content</p>
          </div>
          <div
            data-aos="fade-up"
            data-aos-duration="1000"
            className="grid grid-cols-2 xl:grid-cols-3 gap-4 mt-4"
          >
            {contents.map((content) => (
              <div key={content.id} className="flex flex-col gap-1 capitalize">
                <p>{content.title}</p>
                <Link
                  to={`${location.pathname}${content.url}`}
                  className="flex flex-col gap-1 relative"
                >
                  <figure className="rounded-md overflow-hidden cursor-pointer">
                    <img
                      className="rounded-md scale-105 hover:scale-125 transition-all ease-in-out duration-500"
                      src={`images/contents/${content.image}`}
                      alt={content.title}
                    />
                  </figure>
                  <div className="absolute bottom-0 left-0 bg-black bg-opacity-70 rounded-b-md w-full h-auto px-4 py-1 text-center">
                    <p>{content.description}</p>
                  </div>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default HomePage;
