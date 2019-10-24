import React, { useReducer, useEffect } from "react";

import Header from "./Header";
import Movie from "./Movie";
import spinner from "../assets/ajax-loader.gif";
import Search from "./Search";
import { initialState, reducer } from "../store/reducer";
import axios from "axios";
import * as constants from "../store/constants";


const App = () => {
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    axios.get(`${constants.MOVIE_API_URL}?s=star wars&apikey=${constants.API_KEY}`).then(jsonResponse => {
      dispatch({
        type: "SEARCH_MOVIES_SUCCESS",
        payload: jsonResponse.data.Search
      });
    });
  }, []);

  // you can add this to the onClick listener of the Header component
  const refreshPage = () => {
    window.location.reload();
  };

  const search = (searchValue,sorting) => {
    dispatch({
      type: "SEARCH_MOVIES_REQUEST"
    });
    console.log(searchValue,sorting);
    axios(`${constants.MOVIE_API_URL}?s=${searchValue}&apikey=${constants.API_KEY}`).then(
      jsonResponse => {
        if (jsonResponse.data.Response === "True") {

          //sorting response
           let data  =  jsonResponse.data.Search.sort(function(a, b){
                  if(a[sorting] < b[sorting]) { return -1; }
                  if(a[sorting] > b[sorting]) { return 1; }
                  return 0;
                });

          //dispatching on success
          dispatch({
            type: "SEARCH_MOVIES_SUCCESS",
            payload: data
          });
        } else {
          //dispatching on failure
          dispatch({
            type: "SEARCH_MOVIES_FAILURE",
            error: jsonResponse.data.Error
          });
        }
      }
    );
  };

  const { movies, errorMessage, loading } = state;

  const retrievedMovies =
    loading && !errorMessage ? (
      <img className="spinner" src={spinner} alt="Loading spinner" />
    ) : errorMessage ? (
      <div className="errorMessage">{errorMessage}</div>
    ) : (
      movies.map((movie, index) => (
        <Movie key={`${index}-${movie.Title}`} movie={movie} />
      ))
    );

  return (
    <div className="App">
      <div className="m-container">
        <Header text="Moview Search" />

        <Search search={search} />

        <p className="App-intro">Sharing a few of our favourite movies</p>

        <div className="movies">{retrievedMovies}</div>
      </div>
    </div>
  );
};

export default App;
