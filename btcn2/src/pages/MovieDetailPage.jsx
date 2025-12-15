import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { movieService } from "@/services/movie.service";
import { useNavigate } from "react-router-dom";

export default function MovieDetailPage() {
    const { id } = useParams();
    const [movie, setMovie] = useState(null);
    const [reviews, setReviews] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchDetail = async () => {
            try {
                const res = await movieService.getDetail(id);
                setMovie(res);
                const reviewsRes = await movieService.getReviews(id);
                setReviews(reviewsRes.data || []);
            } catch (err) {
                console.error(err);
            } finally {
                setLoading(false);
            }
        };

        fetchDetail();
    }, [id]);

    if (loading) return <div className="p-6">Loading...</div>;
    if (!movie) return <div className="p-6">Movie not found</div>;

    return (
        <div className="max-w-[1200px] mx-auto p-6 grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
                <img
                    src={movie.image}
                    alt={movie.title}
                    className="rounded-xl shadow-lg"
                />
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
                <div
                    className="mt-6 text-sm leading-relaxed"
                    dangerouslySetInnerHTML={{ __html: movie.plot_full }}
                />
            </div>

            <div className="mt-8 col-span-3">
                <h3 className="font-semibold mb-3">Cast</h3>
                {/* ACTORS */}
                <div className="flex gap-4 overflow-x-auto overflow-y-hidden">
                    {movie.actors?.map((a) => (
                        <div
                            key={a.id}
                            className="w-[200px] cursor-pointer rounded-lg transition-transform duration-300 hover:scale-105"
                            onClick={() => navigate(`/person/${a.id}`)}
                        >
                            <img src={a.image} className="rounded-lg" />
                            <p className="text-xs mt-1">{a.name}</p>
                            <p className="text-[12px] text-gray-500">{a.character}</p>
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
                                    <p className="font-semibold">User: {review.username}</p>
                                    <p className="text-sm text-gray-500">
                                        Rating: {review.rate} / 10.0
                                    </p>
                                </div>
                                <p className="text-sm italic text-semibold">Title: {review.title}</p>
                                <p className="mt-2 text-sm leading-relaxed">
                                    {review.content}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
}
