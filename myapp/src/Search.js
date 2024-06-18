import React from 'react'
import { useGlobalContext } from './context'

const Search = () => {
  const{searchquery,setSearchquery,isError}=useGlobalContext();
  return(
    <>
  <section className='search-section'>
  <h2>Movie house</h2>
  <form action='#' onSubmit={(e)=>e.preventDefault()}>
  <div>
    <input 
    type='text'
    placeholder='search movie name'
    value={searchquery}
    onChange={(e)=>setSearchquery(e.target.value)}
    />
  </div>

  </form>
  <div className='card-error'>
  <p>{isError.show && isError.message}</p>
  </div>

  </section>
  </>
  )
 
}

export default Search