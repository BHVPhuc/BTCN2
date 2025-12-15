import { ChevronLeft, ChevronRight } from "lucide-react";
import { useState } from "react";

export default function FeaturedMovie({ movies = [] }) {
    const [index, setIndex] = useState(0);

    if (!Array.isArray(movies) || movies.length === 0) {
        return null;
    }

    const movie = movies[index];

    const handlePrev = () => {
        setIndex((prev) => (prev === 0 ? movies.length - 1 : prev - 1));
    };

    const handleNext = () => {
        setIndex((prev) => (prev === movies.length - 1 ? 0 : prev + 1));
    };

    return (
        <div className="relative max-w-full h-full flex items-center justify-between px-4">
            {/* Left Arrow */}
            <button
                onClick={handlePrev}
                className="p-2 rounded-full transition-colors cursor-pointer"
            >
                <ChevronLeft size={48} className="text-gray-400 hover:text-gray-800" />
            </button>

        {/* Content */}
        <div className="flex-1 h-full flex items-center justify-center">
            <div className="h-[85%] aspect-2/3 rounded-lg shadow-md overflow-hidden transition-all">
            <img
                src={movie.image}
                alt={movie.title}
                className="w-full h-full object-cover"
            />
            </div>
        </div>

        {/* Right Arrow */}
        <button
            onClick={handleNext}
            className="p-2 rounded-full transition-colors cursor-pointer"
        >
            <ChevronRight size={48} className="text-gray-400 hover:text-gray-800" />
        </button>
        </div>
    );
}
