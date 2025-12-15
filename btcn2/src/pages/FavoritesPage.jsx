import { useAuth } from "@/context/AuthContext";
import { Navigate, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { movieService } from "@/services/movie.service";
import { Loader2, Heart } from "lucide-react";
import {
    Pagination,
    PaginationContent,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
} from "@/components/ui/pagination";

export default function FavoritesPage() {
    const { isAuthenticated, token } = useAuth();
    const [favorites, setFavorites] = useState([]);
    const [loading, setLoading] = useState(true);
    const [page, setPage] = useState(1);
    const navigate = useNavigate();

    const ITEMS_PER_PAGE = 10;

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

    const totalPages = Math.ceil(favorites.length / ITEMS_PER_PAGE);
    const paginatedFavorites = favorites.slice(
        (page - 1) * ITEMS_PER_PAGE,
        page * ITEMS_PER_PAGE
    );

    const handlePageChange = (newPage) => {
        if (newPage >= 1 && newPage <= totalPages) {
            setPage(newPage);
            window.scrollTo({ top: 0, behavior: "smooth" });
        }
    };

    const handleRemoveFavorite = async (e, movieId) => {
        e.stopPropagation();
        if (!confirm("Remove this movie from favorites?")) return;

        try {
            await movieService.removeFavorite(movieId, token);
            setFavorites(prev => prev.filter(m => m.id !== movieId));
            // If the current page becomes empty and it's not the first page, go back one page
            if (paginatedFavorites.length === 1 && page > 1) {
                setPage(page - 1);
            }
        } catch (error) {
            console.error("Failed to remove favorite", error);
            alert("Failed to remove favorite");
        }
    };

    return (
        <div className="max-w-[1200px] mx-auto p-6">
            <h1 className="text-3xl font-bold mb-6">My Favorite Movies</h1>

            {favorites.length === 0 ? (
                <div className="text-center py-20 text-gray-500">
                    <p className="text-xl">You haven't added any favorites yet.</p>
                </div>
            ) : (
                <>
                    <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-6">
                        {paginatedFavorites.map((movie) => (
                            <div
                                key={movie.id}
                                className="bg-white dark:bg-[#1e293b] rounded-xl overflow-hidden shadow-sm hover:shadow-md transition cursor-pointer group"
                                onClick={() => navigate(`/movies/${movie.id}`)}
                            >
                                <div className="aspect-[2/3] overflow-hidden relative">
                                    <img
                                        src={movie.image_url || movie.image}
                                        alt={movie.title}
                                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                                    />
                                    <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity" />
                                    <button
                                        onClick={(e) => handleRemoveFavorite(e, movie.id)}
                                        className="absolute top-2 right-2 p-2 bg-black/50 hover:bg-red-500/80 rounded-full text-white opacity-0 group-hover:opacity-100 transition-all transform hover:scale-110"
                                        title="Remove from favorites"
                                    >
                                        <Heart size={18} className="fill-red-500 text-red-500" />
                                    </button>
                                </div>
                                <div className="p-3">
                                    <h3 className="font-semibold text-sm line-clamp-1 mb-1" title={movie.title}>
                                        {movie.title}
                                    </h3>
                                    <div className="flex justify-between items-center text-xs text-gray-500 dark:text-gray-400">
                                        <span>{movie.release_year || movie.year}</span>
                                        {(movie.external_ratings?.imDb || movie.ratings?.imDb) && (
                                            <span className="flex items-center gap-1">
                                                ⭐ {movie.external_ratings?.imDb || movie.ratings?.imDb}
                                            </span>
                                        )}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    {totalPages > 1 && (
                        <div className="mt-8">
                            <Pagination>
                                <PaginationContent>
                                    <PaginationItem>
                                        <PaginationPrevious
                                            href="#"
                                            onClick={(e) => {
                                                e.preventDefault();
                                                handlePageChange(page - 1);
                                            }}
                                            className={page === 1 ? "pointer-events-none opacity-50" : "cursor-pointer"}
                                        />
                                    </PaginationItem>

                                    {Array.from({ length: totalPages }).map((_, i) => (
                                        <PaginationItem key={i}>
                                            <PaginationLink
                                                href="#"
                                                isActive={page === i + 1}
                                                onClick={(e) => {
                                                    e.preventDefault();
                                                    handlePageChange(i + 1);
                                                }}
                                                className="cursor-pointer"
                                            >
                                                {i + 1}
                                            </PaginationLink>
                                        </PaginationItem>
                                    ))}

                                    <PaginationItem>
                                        <PaginationNext
                                            href="#"
                                            onClick={(e) => {
                                                e.preventDefault();
                                                handlePageChange(page + 1);
                                            }}
                                            className={page === totalPages ? "pointer-events-none opacity-50" : "cursor-pointer"}
                                        />
                                    </PaginationItem>
                                </PaginationContent>
                            </Pagination>
                        </div>
                    )}
                </>
            )}
        </div>
    );
}
