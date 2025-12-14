import { ChevronLeft, ChevronRight } from 'lucide-react';

export default function MovieRow({ title }) {
    return (
        <div className="w-full h-full flex flex-col p-2">
            <h3 className="text-lg font-bold text-[#4b282d] dark:text-white mb-1">{title}</h3>

            <div className="flex-1 flex items-center relative">
                {/* Left Arrow */}
                <button className="absolute left-0 z-10 p-1 bg-white/50 rounded-full hover:bg-white/80 shadow-sm cursor-pointer">
                    <ChevronLeft size={24} className="text-gray-600" />
                </button>

                {/* Movie List Placeholder */}
                <div className="flex-1 flex gap-3 overflow-hidden h-full px-8">
                    {[1, 2, 3, 4].map((item) => (
                        <div key={item} className="flex-1 bg-gray-300 rounded-lg shadow-sm flex items-center justify-center text-xs text-gray-500 min-w-0 transition-transform hover:scale-105 cursor-pointer">
                            Thumbnail {item}
                        </div>
                    ))}
                </div>

                {/* Right Arrow */}
                <button className="absolute right-0 z-10 p-1 bg-white/50 rounded-full hover:bg-white/80 shadow-sm cursor-pointer">
                    <ChevronRight size={24} className="text-gray-600" />
                </button>
            </div>
        </div>
    )
}
