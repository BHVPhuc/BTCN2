import { useSearchParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { movieService } from "@/services/movie.service";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
  PaginationEllipsis,
} from "@/components/ui/pagination";
import MovieCard from "@/components/movie/MovieCard";


export default function SearchPage() {

  const [movies, setMovies] = useState([]);
  const [params, setParams] = useSearchParams();

  const q = params.get("q");
  const page = Number(params.get("page")) || 1;

  const [totalPages, setTotalPages] = useState(1);

  const goToPage = (p) => {
    setParams({
      q,
      page: p,
    });
  };

  useEffect(() => {
    if (!q) return;

    movieService
      .searchMovies({ q, page, limit: 10 })
      .then((res) => {
        setMovies(res.data);
        setTotalPages(res.pagination.total_pages);
      })
      .catch(console.error);
  }, [q, page]);


  return (
    <div className="max-w-[1200px] mx-auto p-4">
        <h2 className="text-xl font-bold mb-4">
            Search results for "{q}"
        </h2>

        {/* MOVIES */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-5">
          {movies.map((movie) => (
            <MovieCard key={movie.id} movie={movie} />
          ))}
        </div>
        {/* PAGINATION */}
        <Pagination className="mt-8">
          <PaginationContent>

            {/* PREVIOUS */}
            <PaginationItem>
              <PaginationPrevious
                onClick={() => page > 1 && goToPage(page - 1)}
              />
            </PaginationItem>

            {/* PAGE NUMBERS */}
            {Array.from({ length: totalPages }).map((_, i) => {
              const p = i + 1;

              if (
                p === 1 ||
                p === totalPages ||
                Math.abs(p - page) <= 1
              ) {
                return (
                  <PaginationItem key={p}>
                    <PaginationLink
                      isActive={page === p}
                      onClick={() => goToPage(p)}
                    >
                      {p}
                    </PaginationLink>
                  </PaginationItem>
                );
              }

              if (p === page - 2 || p === page + 2) {
                return (
                  <PaginationItem key={p}>
                    <PaginationEllipsis />
                  </PaginationItem>
                );
              }

              return null;
            })}

            {/* NEXT */}
            <PaginationItem>
              <PaginationNext
                onClick={() =>
                  page < totalPages && goToPage(page + 1)
                }
              />
            </PaginationItem>

          </PaginationContent>
        </Pagination>

    </div>
  );
}
