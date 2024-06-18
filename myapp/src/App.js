import './App.css';
import {Routes,Route} from "react-router-dom"
import Home from "./Home"
import Error from './Error';
import MovieComponent from './MovieComponent';

const App=()=> {
  return (
        <Routes>
          <Route path='/' element={<Home/>}/>
          <Route path='movie/:id' element={<MovieComponent/>}/>
          <Route path='*' element={<Error/>}/>
        </Routes>
  );
}

export default App;
