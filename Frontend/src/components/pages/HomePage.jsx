import { Link } from "react-router-dom";
import Header from "../layouts/Header";

function HomePage({ games, setBgImg }) {
  return (
    <div className="w-full h-full overflow-y-auto">
      <Header />
      <div className="w-full max-w-[1280px] m-auto p-8 text-white text-xl font-bold">
        <p>All games</p>
        <div className="grid grid-cols-3 xl:grid-cols-4 gap-4 mt-4">
          {games.map((game) => (
            <Link
              onMouseOver={() => setBgImg(game.image)}
              to={game.url}
              key={game.id}
              className="flex flex-col text-center gap-2"
            >
              <figure className="rounded-md overflow-hidden">
                <img
                  className="rounded-md cursor-pointer hover:scale-125 transition-all ease-in-out duration-300"
                  src={`images/${game.image}`}
                  alt={game.title}
                />
              </figure>
              <p>{game.title}</p>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}

export default HomePage;
