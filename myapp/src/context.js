import React, {useContext, useEffect, useState } from "react";



export const api_url=`http://www.omdbapi.com/?apikey=${process.env.REACT_APP_MYAPI_KEY}`;


//create context(warehouse) it work just like parents from here child anytime get data
const AppContext = React.createContext();

//create provider(delivery boy) function

const AppProvider=({children})=>{
    const[isLoading,setIsLoading]=useState(true);
    const[movie,setMovie]=useState([]);
    const[isError,setIsError]=useState({show:"false",message:""})
    const[searchquery,setSearchquery]=useState('titanic');

  const getMovies=async(url)=>{
    setIsLoading(true)
    try{
        const response=await fetch(url);
        const data=await response.json();
        console.log(data);
        if(data.Response==="True"){
            setIsLoading(false)
            setIsError({
                show:false,
                message:"",
            })
            setMovie(data.Search)
        }else{
            setIsError({
                show:true,
                message:data.Error,
            })
        }
    }catch(error){
        console.log(error)
    }
  }
    useEffect(()=>{
        //debouncing
       let timeOut=setTimeout(()=>{
            getMovies(`${api_url}&s=${searchquery}`)

        },100)
        return()=>clearTimeout(timeOut)
      
    },[searchquery])
       
    return <AppContext.Provider value={{isLoading,movie,isError,searchquery,setSearchquery}}>
        {children}
    </AppContext.Provider>
}

//create Golbal custom hooks
const useGlobalContext=()=>{
    return useContext(AppContext)
}

export {AppContext,AppProvider,useGlobalContext}

