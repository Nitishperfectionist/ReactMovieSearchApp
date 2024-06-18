import React from 'react'
import { useParams } from 'react-router-dom';
import { NavLink } from 'react-router-dom';
import useFetch from './useFetch';

const MovieComponent = () => {
    const {id}=useParams();
    
    const { isLoading, movie} = useFetch(`&i=${id}`);

        if(isLoading){
            return(
                <div className='movie-section'>
                    <div className='loading'>Loading...</div>
                </div>
                 )
           }
        return(
            <>
                <section className='movie-section'>
                <div className='movie-card'>
                    <figure>
                        <img src={movie.Poster} alt=''/>
                    </figure>
                    <div className="card-content">
                  <p className="title">{movie.Title}</p>
                  <p className="card-text">{movie.Plot}</p>
                  <p className="card-text">{movie.Genre}</p>
                  <p className="card-text">{movie.imdbRating} / 10</p>
               <NavLink to="/" className="back-btn">
                   Go Back
              </NavLink>
            </div>
                </div>

                </section>
            </>
        )
    }
export default MovieComponent