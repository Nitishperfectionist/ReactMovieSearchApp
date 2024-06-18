import React from 'react'
import { useGlobalContext } from './context'

const Movies = () => {
    const {movie}= useGlobalContext();
  return (
    <>
   {movie.map((currentMovie)=>{
        return (
            <div>{currentMovie.Title}</div>
        )
       
   })}
    </>
  )
}

export default Movies