import React,{useState,useEffect,useCallback} from 'react';

import MoviesList from './components/MoviesList';
import './App.css';

function App() {
  const [movies,SetMovies]=useState([]);
  const [loading,setloading]=useState(false);
  const [error,setError]=useState(null);
  const fetchMovieHandler=useCallback(async() => {
    setloading(true);
    setError(null);
    try
    {
      const response=await fetch("https://swapi.dev/api/films/");
      if(!response.ok)
      {
        throw new Error('Something went to Wrong!');
      }
      const data=await response.json();
      const tranformedMovies=data.results.map(movieData=>
      {
          return {
            id:movieData.episode_id,
            title:movieData.title,
            openingText:movieData.opening_crawl,
            releseDate:movieData.releseDate
          };
        });
        SetMovies(tranformedMovies);
    }
    catch(error)
    {
        setError(error.message);
        setloading(false);
    }
    setloading(false);
},[]);
useEffect(()=>
  {
    fetchMovieHandler();
  },[fetchMovieHandler]);
   
  return (
    <React.Fragment>
      <section>
        <button onClick={fetchMovieHandler}>Fetch Movies</button>
      </section>
      <section>
        {!loading && movies.length>0 && <MoviesList movies={movies} />}
        {!loading && movies.length===0 && !error && <p>Data Not Found</p>}
        {!loading && error && <p>{error}</p>}
        {loading && <p>Loading... </p>}
      </section>
    </React.Fragment>
  );
}

export default App;
