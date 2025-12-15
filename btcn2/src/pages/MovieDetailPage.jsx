import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { movieService } from "@/services/movie.service";

export default function MovieDetailPage() {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDetail = async () => {
      try {
        const res = await movieService.getDetail(id);
        setMovie(res);
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


    </div>
  );
}
