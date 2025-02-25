import MovieCard from "../components/MovieCard"
import { useState, useEffect } from "react";
import { getPopularMovies } from "../services/api";
import { searchMovies } from "../services/api";
import "../css/Home.css";

function Home() {
    const [searchQuery, setSearchQuery] = useState("");
    const [movies, setMovies] = useState([]);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);

    //load popularmovies only runs once when loaded
    useEffect(() => {
        const loadPopularMovies = async () => {
            try {
                const popularMovies = await getPopularMovies()
                setMovies(popularMovies)
            } catch (err) {
                console.log(err);
                setError("Failed to load movies");
            }
            finally {
                setLoading(false);
            }

        }
        loadPopularMovies()
    }, [])

    const handleSearch = (e) => {
        e.preventDefault(); //prevents deletion of the contents
        alert(searchQuery);
    }

    return (
        <div className="home">
            <form onSubmit={handleSearch} className="search-form">
                <input type="text" placeholder="Search for movies..." className="search-input" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} />
                <button type="submit" className="search-button">Search</button>

            </form>



            {/* conditionally rendering the movies which start with the current state of the searchQuery */}
            {/* When state change occurs, entire home is rerendered  */}
            {loading ? <div clasName="Loading">loading...</div> : <div className="movies-grid">
                {/*movies.map(<MovieCard movie = {movie} key = {movie.id}/>)*/}
                {movies.map((movie) => movie.title.toLowerCase().startsWith(searchQuery.toLowerCase()) && (<MovieCard movie={movie} key={movie.id} />))}
            </div>}

        </div>
    );
}
export default Home;