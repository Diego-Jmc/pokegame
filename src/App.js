import './App.css';
import { useEffect, useState } from 'react';
import axios from "axios";

function App() {
  const [pokemons,setPokemons] = useState([]);

  function fetchPokemons() {
    axios
      .get(`${process.env.REACT_APP_POKE_API_URL}?limit=492`)
      .then((response) => {
        const pokemons = response.data.results.map(e=> e.name);
        setPokemons(pokemons)
        })
      .catch((error) => {
        console.error("Error al hacer la petición:", error);
      });
  }

  useEffect(() => {
    fetchPokemons();
  }, [])

  return (
    <div>
      <div>
      </div>
    </div>
  );
}

export default App;
