import { ChevronLeft, ChevronRight } from "lucide-react";
import { useState } from "react";

export default function FeaturedMovie({ movies = [] }) {
  const [index, setIndex] = useState(0);

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
                <div className="h-[85%] w-[500px] aspect-[2/3] rounded-xl overflow-hidden shadow-lg">
                    <img
                    src={movie.image}
                    alt={movie.title}
                    className="w-full h-full object-cover"
                    />
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
