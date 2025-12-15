import { ChevronLeft, ChevronRight } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function FeaturedMovie({ movies = [] }) {
  const [index, setIndex] = useState(0);
  const navigate = useNavigate();

  if (!movies.length) return null;

  const handlePrev = () => {
    setIndex((i) => (i === 0 ? movies.length - 1 : i - 1));
  };

  const handleNext = () => {
    setIndex((i) => (i === movies.length - 1 ? 0 : i + 1));
  };

  return (
    <div className="relative w-full h-full flex items-center max-w-[1200px]">
      {/* LEFT ARROW */}
      <button
        onClick={handlePrev}
        className="absolute left-4 z-20 p-3 bg-white/80 dark:bg-black/60
                    rounded-full shadow hover:scale-110 transition"
      >
        <ChevronLeft size={36} />
      </button>

      {/* SLIDE BAR */}
      <div className="flex justify-center gap-2 absolute bottom-10 z-50 left-1/2 transform -translate-x-1/2">
        {movies.map((_, i) => (
          <span
            key={i}
            className={`w-6 h-1.5 rounded-full transition-all duration-300 cursor-pointer ${i === index
              ? "bg-red-600 w-8 opacity-100 shadow-md"
              : "bg-gray-400 opacity-70 hover:opacity-100 hover:bg-gray-300"
              }`}
            onClick={() => setIndex(i)}
          />
        ))}
      </div>

      {/* VIEWPORT */}
      <div className="w-full h-full overflow-hidden">
        {/* TRACK */}
        <div
          className="flex h-full transition-transform duration-700 ease-in-out"
          style={{
            width: `${movies.length * 100}%`,
            transform: `translateX(-${index * (100 / movies.length)}%)`,
          }}
        >
          {movies.map((movie) => (
            <div
              key={movie.id}
              className="w-full h-full flex items-center justify-center"
            >
              <div className="relative h-[85%] w-[500px] aspect-[2/3] rounded-xl overflow-hidden shadow-lg">
                {/* IMAGE */}
                <img
                  onClick={() => navigate(`/movies/${movie.id}`)}
                  src={movie.image}
                  alt={movie.title}
                  className="w-full h-full object-cover cursor-pointer"
                />

                {/* OVERLAY INFO */}
                <div
                  className="absolute bottom-0 left-0 right-0
                                    bg-gradient-to-t from-black/80 via-black/40 to-transparent
                                    p-4 text-white"
                >
                  {/* TITLE */}
                  <h3 className="text-lg font-bold leading-tight text-center">
                    {movie.title}
                  </h3>

                  {/* YEAR */}
                  {movie.year && (
                    <p className="text-sm text-gray-300 text-center mt-1">
                      {movie.year}
                    </p>
                  )}

                  {/* GENRES */}
                  {Array.isArray(movie.genres) && movie.genres.length > 0 && (
                    <p className="text-xs text-gray-300 mt-1 text-center">
                      [{movie.genres.join(", ")}]
                    </p>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* RIGHT ARROW */}
      <button
        onClick={handleNext}
        className="absolute right-4 z-20 p-3 bg-white/80 dark:bg-black/60
                    rounded-full shadow hover:scale-110 transition"
      >
        <ChevronRight size={36} />
      </button>
    </div>
  );
}
