
import React, { useContext, useEffect, useState } from "react";

export const api_url = `https://www.omdbapi.com/?apikey=${process.env.REACT_APP_MYAPI_KEY}`;

// Create context (warehouse) - it works just like a parent from which child can get data anytime
const AppContext = React.createContext();

// Create provider (delivery boy) function
const AppProvider = ({ children }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [movie, setMovie] = useState([]);
  const [isError, setIsError] = useState({ show: false, message: "" });
  const [searchquery, setSearchquery] = useState("");

  // List of popular movies
  const popularMovies = ["Avengers", "Inception", 
                        "The Dark Knight", "Interstellar",
                         "Titanic","Thor","Dilwale",
                         "Mohabbate","Tiger","Drishyam","Down River",
                         "God Father","Harry Potter"
                        ];

  const getMovies = async (url) => {
    setIsLoading(true);
    try {
      const response = await fetch(url);
      const data = await response.json();
      console.log(data);
      if (data.Response === "True") {
        setIsLoading(false);
        setIsError({
          show: false,
          message: "",
        });
        setMovie(data.Search);
      } else {
        setIsError({
          show: true,
          message: data.Error,
        });
        setIsLoading(false);
      }
    } catch (error) {
      console.log(error);
      setIsError({
        show: true,
        message: "Something went wrong!",
      });
      setIsLoading(false);
    }
  };

  useEffect(() => {
    // Fetch popular movies on initial load
    const fetchPopularMovies = async () => {
      setIsLoading(true);
      try {
        const moviesPromises = popularMovies.map((title) =>
          fetch(`${api_url}&t=${title}`).then((response) => response.json())
        );
        const moviesResults = await Promise.all(moviesPromises);
        const validMovies = moviesResults.filter((movie) => movie.Response === "True");
        setMovie(validMovies);
        setIsLoading(false);
      } catch (error) {
        console.log(error);
        setIsError({
          show: true,
          message: "Something went wrong!",
        });
        setIsLoading(false);
      }
    };

    if (!searchquery) {
      fetchPopularMovies();
    } else {
      const timeoutId = setTimeout(() => {
        getMovies(`${api_url}&s=${searchquery}`);
      }, 100);
      return () => clearTimeout(timeoutId);
    }
  }, [searchquery]);

  return (
    <AppContext.Provider
      value={{ isLoading, movie, isError, searchquery, setSearchquery }}
    >
      {children}
    </AppContext.Provider>
  );
};

// Create Global custom hooks
const useGlobalContext = () => {
  return useContext(AppContext);
};

export { AppContext, AppProvider, useGlobalContext };




