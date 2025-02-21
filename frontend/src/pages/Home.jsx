import MovieCard from "../components/MovieCard"
import { useState } from "react";
import "../css/Home.css";

function Home() {
    const [searchQuery, setSearchQuery] = useState("");
    const movies = [
        {id: 1, title: "John Wick", release_date: 2020},
        {id: 2, title: "Pery ", release_date: 2024},
        {id: 3, title: "Anthony", release_date: 1234},
        {id: 4, title: "Manjummel Boys ", release_date: 1432},
        {id: 5, title: "The Pianist", release_date: 1856},
        {id: 6, title: "Life is Beutiful ", release_date: 2011}
    ]
    const handleSearch = (e) => {
        e.preventDefault(); //prevents deletion of the contents
        alert(searchQuery);
    }

    return(
        <div className = "home">
            <form onSubmit = {handleSearch} className = "search-form">
                <input type="text" placeholder="Search for movies..." className="search-input" value={searchQuery} onChange={(e)=>setSearchQuery(e.target.value)}/>
                <button type = "submit" className = "search-button">Search</button>
            
            </form>
            {/* conditionally rendering the movies which start with the current state of the searchQuery */}
             {/* When state change occurs, entire home is rerendered  */}
            <div className = "movies-grid">
                {movies.map((movie) => movie.title.toLowerCase().startsWith(searchQuery.toLowerCase()) && (<MovieCard movie = {movie} key = {movie.id}/>))}
            </div>
        </div>
    );
}
export default Home;