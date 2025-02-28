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
                console.log(movies);
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
    //When user hits the enter button
    const handleSearch = async (e) => {
        e.preventDefault(); //prevents deletion of the contents upon search
        alert(searchQuery);
        if(!searchQuery.trim())return; //if search query is emty, searchQuery.trim() returns false
        if(loading)return; //we dont want to enter when loading
        setLoading(true)
        try{
            const searchResults = await searchMovies(searchQuery);
            setMovies(searchResults);
            setError(null);
        }catch (err) {
            console.log(err);
            setError("Failed to search movies...");
        }finally {
            setLoading(false);
        }
    }
    const updateMoviesBasedOnSearchQuery = async (query) =>{
        setSearchQuery(query);
        const moviesThatAreRelatedToQuery = await searchMovies(query);
        setMovies(moviesThatAreRelatedToQuery);
        console.log(query);
        console.log(moviesThatAreRelatedToQuery);
    }
    //layout of the home page
    return (
        <div className="home">
            <form onSubmit={handleSearch} className="search-form">
                <input type="text" placeholder="Search for movies..." className="search-input" value={searchQuery} onChange={(e) => updateMoviesBasedOnSearchQuery(e.target.value)} />
                <button type="submit" className="search-button">Search</button>

            </form>

            {error && <div className="error-message">{error}</div>}

            {loading ? <div className="Loading">loading...</div> : <div className="movies-grid">
                {movies.map((movie) => (<MovieCard movie={movie} key={movie.id} />))}
            </div>}

        </div>
    );
}
export default Home;