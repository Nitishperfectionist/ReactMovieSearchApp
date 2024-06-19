import React from 'react'
import { useGlobalContext } from './context'
import { NavLink } from 'react-router-dom';
const imgurl = "https://via.placeholder.com/200/200";

const Movies = () => {
    const {movie,isLoading}= useGlobalContext();
    if(isLoading){
      return(
        <div className=''>
          <div className='loading'>
            Loading...
          </div>
        </div>
      )

    }
  return (
    <section className='movie-page'>
    <div className='container grid grid-4-col'>
    {movie.map((currentMovie)=>{

        const{imdbID,Title,Poster,Year}=currentMovie
        const movieTitle=Title.substring(0,15)
        return <NavLink to={`movie/${imdbID}`} key={imdbID}>
        <div className='card'>
            <div className='card-info'>
            <h2>{movieTitle.length >=15 ? `${movieTitle}...` : movieTitle}</h2>
            <img src={Poster==="N/A"?imgurl : Poster} alt="#" />
            <h3>{Year}</h3>
           </div>
        </div>
            </NavLink>
       })}
    </div>

    </section>
  )
}

export default Movies