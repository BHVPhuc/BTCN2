import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { personService } from "@/services/person.service";

export default function PersonDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [person, setPerson] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    personService
      .getDetail(id)
      .then(setPerson)
      .catch(console.error)
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) return <div className="p-6">Loading...</div>;
  if (!person) return <div className="p-6">Person not found</div>;

  return (
    <div className="max-w-[1200px] mx-auto p-6">
      <div className="flex gap-6">
        {/* IMAGE */}
        <img
          src={person.image}
          alt={person.name}
          className="w-64 h-96 object-cover rounded-xl shadow"
        />

        {/* INFO */}
        <div className="flex-1">
          <h1 className="text-3xl font-bold">{person.name}</h1>

          <p className="mt-1 text-gray-600">
            Roles: {person.role}
          </p>

          <div className="mt-3 text-sm text-gray-500 space-y-1">
            <p>Born: {formatDate(person.birth_date)}</p>
            {person.death_date && (
            <p>Died: {formatDate(person.death_date)}</p>
            )}
            <p>Height: {person.height}</p>
          </div>

          {person.awards && (
            <p className="mt-3 text-sm text-amber-600">
              🏆 {person.awards}
            </p>
          )}

          <p className="mt-4 text-sm leading-relaxed">
            Summary: {person.summary}
          </p>
        </div>
      </div>

      {/* KNOWN FOR */}
      {Array.isArray(person.known_for) && (
        <>
          <h2 className="mt-8 text-xl font-semibold">
            Known for
          </h2>

          <div className="grid grid-cols-5 gap-4 mt-4">
            {person.known_for.map(movie => (
              <div
                key={movie.id}
                onClick={() => navigate(`/movies/${movie.id}`)}
                className="cursor-pointer hover:scale-105 transition"
              >
                <img
                  src={movie.image}
                  className="rounded shadow"
                />
                <p className="text-sm font-medium mt-1">
                  {movie.title} ({movie.year})
                </p>
                <p className="text-xs text-gray-500">
                  {movie.role}
                </p>
                {movie.character && (
                  <p className="text-xs italic text-gray-400">
                    {movie.character}
                  </p>
                )}
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
}

function formatDate(dateStr) {
  if (!dateStr) return "";
  return new Date(dateStr).toLocaleDateString();
}
