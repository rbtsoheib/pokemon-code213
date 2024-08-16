import logo from './logo.svg';
import './App.css';
import { useEffect, useState } from "react";
import PokeDex from "./component/PokeDex";
import PokeInfo from './component/PokeInfo';
import Pagination from './Components/Pagination';
import axios from "axios";


function App() {
  
  const [pokemonList, setPokemonList] = useState([]);
  const [pokemonInfo, setPokemonInfo] = useState("");
  const [loading, setLoading] = useState(true);
  const [url, setUrl] = useState("https://pokeapi.co/api/v2/pokemon/?limit=30&offset=30");

  const [nextUrl, setNextUrl] = useState();
  const [previousUrl, setPreviousUrl] = useState();

  const getPokemons = async (res) => {
    const pokemonData = await Promise.all(
      res.map(async (pokemon) => {
        const result = await axios.get(pokemon.url);
        return result.data;
      })
    );
    setPokemonList(pokemonData);
  };

  const pokemonFetch = async () => {
    try {
      setLoading(true);
      const res = await axios.get(url);
      setNextUrl(res.data.next);
      setPreviousUrl(res.data.previous);
      getPokemons(res.data.results);
      setLoading(false);
    } catch (error) {
      console.error(error);
      setLoading(false);
    }
  };

  useEffect(() => {
    pokemonFetch();
  }, [url]);

  let closeInfo = () => {
    setPokemonInfo("");
  };
  return (
   
         <div className="App">
           {loading ? <h1>"LOADING"</h1> : <PokeDex pokemonList={pokemonList} />}
      {pokemonInfo ? (
        <PokeInfo
          name={pokemonInfo.name}
          sprite={pokemonInfo.sprites.other["official-artwork"].front_default}
          types={pokemonInfo.types}
          stats={pokemonInfo.stats}
          closeInfo={closeInfo}
        />
      ) : (
        ""
      )}
         </div>

     
  );
  
}

export default App;
