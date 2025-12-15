import FeaturedMovie from "../movie/FeaturedMovie";
import MovieRow from "../movie/MovieRow";
import { movieService } from "../../services/movie.service";
import { useEffect, useState } from "react";
import { set } from "zod";

export default function MainContent() {
    const [popular, setPopular] = useState([]);


    useEffect(() => {
        const fetchMovies = async () => {
        try {
            const popularData = await movieService.getMostPopular({page: 1, limit: 12});
            
        setPopular(popularData.data || []);

        } catch (error) {
            console.error(error);
        }
        };

        fetchMovies();
    }, []);

    return (
        <div className="flex-1 grid grid-rows-4 gap-2 py-6 max-w-full">
            <div className="row-span-2">
                <FeaturedMovie movies={[]}/>
            </div>
            <div className="row-span-1">
                <MovieRow title="Most Popular" movies={popular}/>
            </div>
            <div className="row-span-1">
                <MovieRow title="Top Rating" movies={[]}/>
            </div>
        </div>
    )
}