import './App.css';
import { useEffect, useState } from 'react';
import axios from "axios";
import QuestionCard from './components/QuestionCard';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';

function App() {
  const [pokemons, setPokemons] = useState([]);
  const [currentPayload, setCurrentPayload] = useState(null);

  function getRandomSubset(array, size) {
    const shuffled = [...array].sort(() => 0.5 - Math.random());
    return shuffled.slice(0, size);
  }

  function generateRandomNumber(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  function generateRandomSubsetOfPokemons() {
    const pokemon = pokemons[generateRandomNumber(0, pokemons.length - 1)];
    const options = getRandomSubset(pokemons.filter(p => p !== pokemon), 3);
    options.push(pokemon);

    return {
      answer: pokemon,
      options: options.sort(() => 0.5 - Math.random()),
    };
  }

  function fetchPokemons() {
    axios
      .get(`${process.env.REACT_APP_POKE_API_URL}?limit=492`)
      .then((response) => {
        const pokemonsList = response.data.results.map(e => e.name);
        setPokemons(pokemonsList);

        const firstPayload = (() => {
          const pokemon = pokemonsList[generateRandomNumber(0, pokemonsList.length - 1)];
          const options = getRandomSubset(pokemonsList.filter(p => p !== pokemon), 3);
          options.push(pokemon);
          return {
            answer: pokemon,
            options: options.sort(() => 0.5 - Math.random()),
          };
        })();

        setCurrentPayload(firstPayload);
      })
      .catch((error) => {
        console.error("Error al hacer la petición:", error);
      });
  }

  function handlePlayAgain() {
    const newPayload = generateRandomSubsetOfPokemons();
    setCurrentPayload(newPayload);
  }

  useEffect(() => {
    fetchPokemons();
  }, []);

  if (!currentPayload) return <p>Loading Pokémons...</p>;

  return (
    <div className='container'>
      <QuestionCard payload={currentPayload} onPlayAgain={handlePlayAgain} />
    </div>
  );
}

export default App;
