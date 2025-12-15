import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { movieService } from "@/services/movie.service";
import { useNavigate } from "react-router-dom";
import {
    Pagination,
    PaginationContent,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
} from "@/components/ui/pagination";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/context/AuthContext";
import { Heart, Loader2 } from "lucide-react";

export default function MovieDetailPage() {
    const { id } = useParams();
    const [movie, setMovie] = useState(null);
    const [reviews, setReviews] = useState([]);
    const [pagination, setPagination] = useState({
        current_page: 1,
        total_pages: 1,
    });
    const [loading, setLoading] = useState(true);
    const [addingFavorite, setAddingFavorite] = useState(false);
    const [isFavorite, setIsFavorite] = useState(false);
    const navigate = useNavigate();
    const { isAuthenticated, token } = useAuth();

    useEffect(() => {
        const checkFavoriteStatus = async () => {
            if (isAuthenticated && token) {
                try {
                    const favorites = await movieService.getFavorites(token);
                    const isFav = favorites.some(fav => fav.id === id || fav.id === Number(id)); // API might return string or number
                    setIsFavorite(isFav);
                } catch (e) {
                    console.error("Failed to check favorite status", e);
                }
            }
        };
        checkFavoriteStatus();
    }, [isAuthenticated, token, id]);

    const handleToggleFavorite = async () => {
        if (!isAuthenticated) {
            navigate("/login");
            return;
        }
        if (!token) return;
        setAddingFavorite(true);
        try {
            if (isFavorite) {
                await movieService.removeFavorite(id, token);
                setIsFavorite(false);
                // alert("Movie removed from favorites");
            } else {
                await movieService.addFavorite(id, token);
                setIsFavorite(true);
                // alert("Movie added to favorites!");
            }
        } catch (error) {
            console.error("Failed to update favorite", error);
            alert(error.message);
        } finally {
            setAddingFavorite(false);
        }
    };

    const fetchReviews = async (page) => {
        try {
            const res = await movieService.getReviews(id, { page });
            setReviews(res.data || []);
            setPagination(
                res.pagination || { current_page: 1, total_pages: 1 }
            );
        } catch (error) {
            console.error("Failed to fetch reviews", error);
        }
    };

    useEffect(() => {
        const fetchDetail = async () => {
            try {
                const res = await movieService.getDetail(id);
                setMovie(res);
                await fetchReviews(1);
            } catch (err) {
                console.error(err);
            } finally {
                setLoading(false);
            }
        };

        fetchDetail();
    }, [id]);

    const handlePageChange = (page) => {
        if (page >= 1 && page <= pagination.total_pages) {
            fetchReviews(page);
        }
    };

    if (loading) return <div className="p-6">Loading...</div>;
    if (!movie) return <div className="p-6">Movie not found</div>;

    return (
        <div className="max-w-[1200px] mx-auto p-6 grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="relative group">
                <img
                    src={movie.image}
                    alt={movie.title}
                    className="rounded-xl shadow-lg w-full"
                />
                <Button
                    onClick={handleToggleFavorite}
                    disabled={addingFavorite}
                    variant="ghost"
                    size="icon"
                    className="absolute top-4 right-4 bg-black/50 hover:bg-black/70 text-white rounded-full h-10 w-10"
                    title={isFavorite ? "Remove from Favorites" : "Add to Favorites"}
                >
                    {addingFavorite ? (
                        <Loader2 className="h-5 w-5 animate-spin" />
                    ) : (
                        <Heart
                            className={`h-5 w-5 ${isFavorite ? "fill-red-500 text-red-500" : "text-white"}`}
                        />
                    )}
                </Button>
            </div>

            {/* INFO */}
            <div className="md:col-span-2">
                <h1 className="text-3xl font-bold">
                    {movie.title} ({movie.year})
                </h1>

                <p className="text-gray-500 mt-1">
                    {movie.runtime} • {movie.countries?.join(", ")}
                </p>

                {/* GENRES */}
                <div className="mt-2 flex gap-2 flex-wrap">
                    {movie.genres?.map((g) => (
                        <span
                            key={g}
                            className="px-3 py-1 text-xs rounded-full bg-gray-200 dark:bg-gray-700"
                        >
                            {g}
                        </span>
                    ))}
                </div>

                {/* RATINGS */}
                <div className="mt-4 flex gap-4 text-sm">
                    <span className="font-semibold">IMDb: ⭐ {movie.ratings?.imDb}</span>
                    <span className="font-semibold">
                        RT: 🍅 {movie.ratings?.rottenTomatoes}%
                    </span>
                </div>

                {/* PLOT */}
                <p className="text-sm font-semibold dark:text-white">Plot:</p>
                {movie.plot_full ? (
                    <div
                        className="mt-6 text-sm leading-relaxed"
                        dangerouslySetInnerHTML={{ __html: movie.plot_full }}
                    />
                ) : (
                    <p className="mt-6 text-sm leading-relaxed">No plot available</p>
                )}

            </div>

            <div className="mt-10 col-span-3">
                <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                    Cast <span className="text-sm font-normal text-gray-500">({movie.actors?.length || 0})</span>
                </h3>
                {/* ACTORS */}
                <div className="flex gap-5 overflow-x-auto pb-6 pt-2 px-1 scrollbar-thin scrollbar-thumb-gray-300 dark:scrollbar-thumb-gray-600">
                    {movie.actors?.map((a) => (
                        <div
                            key={a.id}
                            className="min-w-[160px] w-[160px] cursor-pointer rounded-xl bg-white dark:bg-gray-800 shadow-sm border border-gray-100 dark:border-gray-700 transition-all duration-300 hover:shadow-lg hover:-translate-y-1"
                            onClick={() => navigate(`/person/${a.id}`)}
                        >
                            <div className="h-[240px] w-full overflow-hidden rounded-t-xl bg-gray-100">
                                <img
                                    src={a.image}
                                    alt={a.name}
                                    className="h-full w-full object-cover transition-transform duration-500 hover:scale-105"
                                    loading="lazy"
                                />
                            </div>
                            <div className="p-3">
                                <p className="font-bold text-sm text-gray-900 dark:text-white line-clamp-1" title={a.name}>
                                    {a.name}
                                </p>
                                <p className="text-xs text-gray-500 mt-1 line-clamp-2 min-h-[2rem]" title={a.character}>
                                    {a.character}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* DIRECTORS */}
            <div className="mt-6">
                <h3 className="font-semibold mb-1">Director</h3>
                <p>{movie.directors?.map((d) => d.name).join(", ")}</p>
            </div>

            {/* REVIEWS */}
            {reviews.length > 0 && (
                <div className="md:col-span-3 mt-12">
                    <h2 className="text-2xl font-bold mb-4">Reviews</h2>
                    <div className="space-y-6">
                        {reviews.map((review, index) => (
                            <div key={index} className="border-b pb-4">
                                <div className="flex gap-4 items-center">
                                    <p className="font-semibold">
                                        User: {review.username}
                                    </p>
                                    <p className="text-sm text-gray-500">
                                        Rating: {review.rate} / 10.0
                                    </p>
                                </div>
                                <p className="text-sm italic text-semibold">
                                    Title: {review.title}
                                </p>
                                <p className="mt-2 text-sm leading-relaxed">
                                    {review.content}
                                </p>
                            </div>
                        ))}
                    </div>

                    {/* PAGINATION */}
                    {pagination.total_pages > 1 && (
                        <div className="mt-6">
                            <Pagination>
                                <PaginationContent>
                                    <PaginationItem>
                                        <PaginationPrevious
                                            onClick={() =>
                                                handlePageChange(
                                                    pagination.current_page - 1
                                                )
                                            }
                                            className={
                                                pagination.current_page === 1
                                                    ? "pointer-events-none opacity-50"
                                                    : "cursor-pointer"
                                            }
                                        />
                                    </PaginationItem>

                                    {Array.from({
                                        length: pagination.total_pages,
                                    }).map((_, i) => (
                                        <PaginationItem key={i}>
                                            <PaginationLink
                                                isActive={
                                                    pagination.current_page ===
                                                    i + 1
                                                }
                                                onClick={() =>
                                                    handlePageChange(i + 1)
                                                }
                                                className="cursor-pointer"
                                            >
                                                {i + 1}
                                            </PaginationLink>
                                        </PaginationItem>
                                    ))}

                                    <PaginationItem>
                                        <PaginationNext
                                            onClick={() =>
                                                handlePageChange(
                                                    pagination.current_page + 1
                                                )
                                            }
                                            className={
                                                pagination.current_page ===
                                                    pagination.total_pages
                                                    ? "pointer-events-none opacity-50"
                                                    : "cursor-pointer"
                                            }
                                        />
                                    </PaginationItem>
                                </PaginationContent>
                            </Pagination>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
}
