import { useState, useEffect } from "react";

export const api_url=`https://www.omdbapi.com/?apikey=${process.env.REACT_APP_MYAPI_KEY}`;

const useFetch = (apiParams) => {
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState({ show: "false", message: "" });
  const [movie, setMovie] = useState(null);

  const getMovies = async (url) => {
    setIsLoading(true);
    try {
      const res = await fetch(url);
      const data = await res.json();

      console.log(data);
      if (data.Response === "True") {
        setIsLoading(false);
        setMovie(data.Search || data);
        setIsError({ show: "false", message: "" });
      } else {
        setIsError({ show: "true", message: data.Error });
      }
    } catch (error) {
      console.log(error);
    }
  };

  // debouncing in react js
  useEffect(() => {
    let timeOut = setTimeout(() => {
      getMovies(`${api_url}&s=${apiParams}`);
    }, 100);
    // console.log("set");
    return () => {
      clearTimeout(timeOut);
    //   console.log("clear");
    };
  }, [apiParams]);

  return { isLoading, isError, movie };
};

export default useFetch;