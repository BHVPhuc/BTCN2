import { ChevronLeft, ChevronRight } from 'lucide-react';

export default function FeaturedMovie() {
    return (
        <div className="relative w-full h-full flex items-center justify-between px-4">
            {/* Left Arrow */}
            <button className="p-2 rounded-full transition-colors cursor-pointer">
                <ChevronLeft size={48} className="text-gray-400 hover:text-gray-800" />
            </button>

            {/* Content Container */}
            <div className="flex-1 h-full flex flex-col items-center justify-center py-2 space-y-2">
                {/* Image Placeholder */}
                <div className="h-[85%] aspect-2/3 bg-gray-300 rounded-lg shadow-md flex items-center justify-center text-gray-500">
                    Poster
                </div>
            </div>

            {/* Right Arrow */}
            <button className="p-2 rounded-full transition-colors cursor-pointer">
                <ChevronRight size={48} className="text-gray-400 hover:text-gray-800" />
            </button>
        </div>
    )
}
