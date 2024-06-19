import './App.css';
import {Routes,Route} from "react-router-dom"
import Home from "./Home"
import MovieComponent from './MovieComponent';
import "./App.css";

const App=()=> {
  return (
        <Routes>
          <Route path='/' element={<Home/>}/>
          <Route path='movie/:id' element={<MovieComponent/>}/>
        </Routes>
  );
}

export default App;
