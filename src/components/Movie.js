import React, { useState }  from "react";
import posterImage from "../assets/poster.jpg";

const Movie = ({ movie }) => {
    const [show, setShow] = useState(false);
  const poster =
    movie.Poster === "N/A" ? posterImage : movie.Poster;



  return (
    <div className="movie">
      <h2>{movie.Title}</h2>
            <div>
                <img
                    width="200"
                    alt={`The movie titled: ${movie.Title}`}
                    src={poster}
                />
            </div>
            <p>({movie.Year})</p>
     </div>
  );
};

export default Movie;
