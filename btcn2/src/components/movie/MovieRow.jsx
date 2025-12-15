import { ChevronLeft, ChevronRight } from "lucide-react";
import { useState, useMemo } from "react";

const ITEMS_PER_PAGE = 3;

export default function MovieRow({ title, movies = [] }) {
    const [page, setPage] = useState(0);

    const pages = useMemo(() => {
        const result = [];
        for (let i = 0; i < movies.length; i += ITEMS_PER_PAGE) {
        result.push(movies.slice(i, i + ITEMS_PER_PAGE));
        }
        return result;
    }, [movies]);

    if (pages.length === 0) {
        return <div className="p-4 text-lg font-bold text-[#4b282d] dark:text-white ">" {title} " movies unavailable</div>;
    }

    const totalPages = pages.length;

    const handlePrev = () => {
        setPage((p) => (p === 0 ? totalPages - 1 : p - 1));
    };

    const handleNext = () => {
        setPage((p) => (p === totalPages - 1 ? 0 : p + 1));
    };

    return (
        <div className="w-full flex flex-col p-2 max-w-[1200px]">
            <h3 className="text-lg font-bold text-[#4b282d] dark:text-white mb-2">
                {title}
            </h3>

            {/* SLIDE BAR */}
            <div className="flex justify-center gap-2 mt-2 mb-1">
                {pages.map((_, i) => (
                <span
                    key={i}
                    className={`w-6 h-1.5 rounded ${
                    i === page ? "bg-red-500" : "bg-gray-300"
                    }`}
                />
                ))}
            </div>

            <div className="relative flex items-center">
                {/* LEFT */}
                <button
                onClick={handlePrev}
                className="absolute left-2 z-20 p-2 bg-white/80 dark:bg-black/60 rounded-full shadow-lg hover:scale-110 transition"
                >
                <ChevronLeft size={24} />
                </button>

                {/* VIEWPORT */}
                <div className="overflow w-full px-12">
                    {/* TRACK */}
                    <div
                        className="flex transition-transform duration-500 ease-out"
                        style={{
                        width: `${totalPages * 100}%`,
                        transform: `translateX(-${page * (100 / totalPages)}%)`,
                        }}
                    >
                        {pages.map((pageMovies, index) => (
                            <div
                                key={index}
                                className="w-full flex justify-center gap-4"
                            >
                                {pageMovies.map((movie) => (
                                    <div
                                        key={movie.id}
                                        className="w-[200px] aspect-[3/3] rounded-lg overflow-hidden shadow hover:scale-205 hover:z-50 transition"
                                    >
                                        <img
                                        src={movie.image}
                                        alt={movie.title}
                                        className="w-full h-full object-fit"
                                        />
                                    </div>
                                ))}
                            </div>
                        ))}
                    </div>
                </div>

                {/* RIGHT */}
                <button
                onClick={handleNext}
                className="absolute right-2 z-20 p-2 bg-white/80 dark:bg-black/60 rounded-full shadow-lg hover:scale-110 transition"
                >
                <ChevronRight size={24} />
                </button>
            </div>
        </div>
    );
}
