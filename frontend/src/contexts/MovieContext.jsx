//state manager for the movies keeping track of gloabal state
import { createContext, useState, useContext, useEffect } from "react";




const MovieContext = createContext()

export const useMovieContext = () => useContext(MovieContext)
//MovieProvider is wrapped around the entire app making the app a child 
export const MovieProvider = ({children }) => {
    const [favorites,setFavorites] = useState([]);

    useEffect(() =>{
        const storedFavs = localStorage.getItem("favorites")
        if(storedFavs) setFavorites(JSON.parse(storedFavs))
    },[])
    //ONLY CHANGES IF FAVORITES CHANGES and sets the favorites in localStorage
    useEffect(() => {
        localStorage.setItem('favorites', JSON.stringify(favorites))
    }, [favorites])

    const addToFavorites = (movie) => {
        //updates the state
        setFavorites(prev => [...prev, movie])
    }

    const removeFromFavorites = (movieId) => {
        setFavorites(prev => prev.filter(movie => movie.id !== movieId))
    }

    const isFavorite = (movieId) => {
        return favorites.some(movie => movie.id === movieId)
    }

    const value = {
        favorites,
        addToFavorites,
        removeFromFavorites,
        isFavorite
    }

    return <MovieContext.Provider value={value}>
        {children}
    </MovieContext.Provider>
}