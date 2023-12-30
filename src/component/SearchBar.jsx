import React, { useState } from "react";
import "../style/SearchBar.css";

const API_KEY = '18be159664346178c6022d35ffd453ba';
const API_URL = "https://api.themoviedb.org/3";
const IMAGE_BASE_URL = "https://image.tmdb.org/t/p/";
const DEFAULT_POSTER_SIZE = "w200";

export default function SearchBar() {
  const [genre, setGenre] = useState("");
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [fromYear,setFromYear] = useState(1900);
  const [toYear,setToYear] = useState(1900);

  const handelSubmit = async (event) => {
    event.preventDefault();
    if(fromYear>toYear)
    {
      setError(" From year should be less than or equal to  To year");
      return;
    }
    setLoading(true);
    try {
      const requestUrl = `${API_URL}/genre/movie/list?api_key=${API_KEY}`;
      const genreResponse = await fetch(requestUrl);
      const genreData = await genreResponse.json();
      const matchedGenre = genreData.genres.find(
        (g) => g.name.toLowerCase() === genre.toLowerCase());
      console.log(matchedGenre);
      if (matchedGenre) {
        const discoveredResponse = await fetch(
          `${API_URL}/discover/movie?api_key=${API_KEY}&with_genres=${matchedGenre.id}&primary_release_date.gte=${fromYear}-01-01&primary_release_date.lte=${toYear}-12-31&sort_by=vote_average.desc`,
        );
        const discoveredData = await discoveredResponse.json();
        setMovies(discoveredData.results);
        setError(null);
      } else {
        setError("Genre not found");
        setMovies([]);
      }
    } catch {
      setError("Error while fetching data,plaese try again.");
      setMovies([]);
    } finally {
      setLoading(false);
    }
  };
  const getFullImagePath = (path) => {
    return `${IMAGE_BASE_URL}${DEFAULT_POSTER_SIZE}${path}`;
  };
  return (
    <div>
      <form onSubmit={handelSubmit}>
        <input
          type="text"
          placeholder="Search genre...."
          value={genre}
          onChange={(e) => setGenre(e.target.value)}
        />
        <button type="submit">Search</button>
        <label className="firstlabel">
          From Year:
          <select className="firstselect" value={fromYear} onChange={(e) => setFromYear(e.target.value)}>
            {Array.from({ length: (2023 - 1900) }, (_, i) => 1900 + i).map(year => (
              <option key={year} value={year}>{year}</option>
            ))}
          </select>
        </label>
        <label className="secondlabel">
          To Year:
          <select className="secondselect" value={toYear} onChange={(e) => setToYear(e.target.value)}>
            {Array.from({ length: (2023 - 1900) }, (_, i) => 1900 + i).map(year => (
              <option key={year} value={year}>{year}</option>
            ))}
          </select>
        </label>
      </form>
      {loading && <p>Loading...</p>}
      {error && <p style={{color:'red'}}>{error}</p>}
      {movies.map((movie,index)=>(
      <div className="class1" key={index}>
        <div  >
            {movie.poster_path && <img className="resizeimage" src={getFullImagePath(movie.poster_path)} alt={movie.title} />}
        </div>
        <div className="sidd">
            <h2>
            {movie.title}
            </h2>
            {movie.overview}
            <br/>
          <p className="second">Rating: {movie.vote_average}</p>
        </div>
        </div>
      ))}
    </div>
  );
}
