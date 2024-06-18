import React, {useContext, useEffect, useState } from "react";



const api_url=`http://www.omdbapi.com/?apikey=e9080b8c&s=titanic`;


//create context(warehouse) it work just like parents from here child anytime get data
const AppContext = React.createContext();

//create provider(delivery boy) function

const AppProvider=({children})=>{
    const[isLoading,setIsLoading]=useState(true);
    const[movie,setMovie]=useState([]);
    const[isError,setIsError]=useState({show:"false",message:""})

  const getMovies=async(url)=>{
    try{
        const response=await fetch(url);
        const data=await response.json();
        console.log(data);
        if(data.Response==="True"){
            setIsLoading(false)
            setMovie(data.Search)
        }else{
            setIsError({
                show:true,
                message:data.error,
            })
        }
    }catch(error){
        console.log(error)
    }
  }
    useEffect(()=>{
       getMovies(api_url)
    },[])
       
    return <AppContext.Provider value={{isLoading,movie,isError}}>
        {children}
    </AppContext.Provider>
}

//create Golbal custom hooks
const useGlobalContext=()=>{
    return useContext(AppContext)
}

export {AppContext,AppProvider,useGlobalContext}

