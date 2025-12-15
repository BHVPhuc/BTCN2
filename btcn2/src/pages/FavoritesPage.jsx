import { useAuth } from "@/context/AuthContext";
import { Navigate, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { movieService } from "@/services/movie.service";
import { Loader2 } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

export default function FavoritesPage() {
    const { isAuthenticated, token } = useAuth();
    const [favorites, setFavorites] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchFavorites = async () => {
            if (!token) return;
            try {
                const data = await movieService.getFavorites(token);
                setFavorites(data || []);
            } catch (error) {
                console.error("Failed to fetch favorites", error);
            } finally {
                setLoading(false);
            }
        };

        if (isAuthenticated) {
            fetchFavorites();
        } else {
            setLoading(false);
        }
    }, [isAuthenticated, token]);


    if (!isAuthenticated) {
        return <Navigate to="/login" replace />;
    }

    if (loading) {
        return (
            <div className="flex justify-center items-center h-[50vh]">
                <Loader2 className="h-8 w-8 animate-spin text-blue-500" />
            </div>
        );
    }

    return (
        <div className="max-w-[1200px] mx-auto p-6">
            <h1 className="text-3xl font-bold mb-6">My Favorite Movies</h1>

            {favorites.length === 0 ? (
                <div className="text-center py-20 text-gray-500">
                    <p className="text-xl">You haven't added any favorites yet.</p>
                </div>
            ) : (
                <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-6">
                    {favorites.map((movie) => (
                        <div
                            key={movie.id}
                            className="bg-white dark:bg-[#1e293b] rounded-xl overflow-hidden shadow-sm hover:shadow-md transition cursor-pointer group"
                            onClick={() => navigate(`/movies/${movie.id}`)}
                        >
                            <div className="aspect-[2/3] overflow-hidden relative">
                                <img
                                    src={movie.image_url}
                                    alt={movie.title}
                                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                                />
                                <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity" />
                            </div>
                            <div className="p-3">
                                <h3 className="font-semibold text-sm line-clamp-1 mb-1" title={movie.title}>
                                    {movie.title}
                                </h3>
                                <div className="flex justify-between items-center text-xs text-gray-500 dark:text-gray-400">
                                    <span>{movie.release_year}</span>
                                    {movie.external_ratings?.imDb && (
                                        <span className="flex items-center gap-1">
                                            ⭐ {movie.external_ratings.imDb}
                                        </span>
                                    )}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}
