import './App.css'
import MovieCard from './components/MovieCard'

function App() {
  const movieNumber = 1;
  return (
    <div>
      <MovieCard movie = {{title: "Aron's Film", release_date: "2024"}}/>
      
    </div>  
  )
}


export default App
