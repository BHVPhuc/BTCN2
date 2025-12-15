import { Star } from 'lucide-react';
import { useNavigate } from "react-router-dom"; 

export default function MovieCard({ movie }) {
  const navigate = useNavigate(); 
  return (
    <div 
    onClick={() => navigate(`/movies/${movie.id}`)}
    className="bg-white dark:bg-[#0b1b39] rounded-xl overflow-hidden shadow
                    hover:scale-[1.03] transition cursor-pointer">

      {/* POSTER */}
      <div className="aspect-[2/3] bg-gray-200">
        <img
          src={movie.image}
          alt={movie.title}
          loading="lazy"
          onError={(e) => {
            e.target.src = "/no-poster.png";
          }}
          className="w-full h-full object-cover"
        />
      </div>

      {/* INFO */}
      <div className="p-3">
        {/* TITLE */}
        <h3 className="font-semibold text-sm line-clamp-2">
          {movie.title}
        </h3>

        {/* META */}
        <div className="text-xs text-gray-500 mt-1 flex gap-2">
          {movie.rate && 
            <><Star size={15}/> <span>{movie.rate}</span></>
          }
          {/* {movie.length && <span>{movie.length} min</span>} */}
        </div>

        {/* GENRES */}
        {Array.isArray(movie.genres) && movie.genres.length > 0 && (
          <p className="text-xs text-gray-400 mt-1 line-clamp-1">
            [{movie.genres.join(", ")}]
          </p>
        )}
      </div>
    </div>
  );
}
