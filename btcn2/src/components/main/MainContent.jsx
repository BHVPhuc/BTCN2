import FeaturedMovie from "../movie/FeaturedMovie";
import MovieRow from "../movie/MovieRow";

export default function MainContent() {
    return (
        <div className="flex-1 grid grid-rows-4 gap-2 py-6">
            <div className="row-span-2">
                <FeaturedMovie />
            </div>
            <div className="row-span-1">
                <MovieRow title="Most Popular" />
            </div>
            <div className="row-span-1">
                <MovieRow title="Top Rating" />
            </div>
        </div>
    )
}