import { useEffect, useState } from "react";
import axios from "axios";

function QuestionCard({ payload, onPlayAgain }) {

  const [pokemonToGuess, setPokemonToGuess] = useState(null);
  const [revealPokemon, setRevealPokemon] = useState(false);
  const [correctAnswer, setCorrectAnswer] = useState(null);
  const [showAnswerResult, setShowAnswerResult] = useState(false);

  const handleSubmitAnswer = (selectedOption) => {
    setRevealPokemon(true);
    setCorrectAnswer(selectedOption === payload.answer);
    setShowAnswerResult(true);
    playPokemonCrie();
  };

  const handlePlayAgainClick = () => {
    setCorrectAnswer(null);
    setShowAnswerResult(false);
    setRevealPokemon(false);
    onPlayAgain();
  }


    const playPokemonCrie = () => {
    const sound = new Audio(pokemonToGuess.cries.legacy);
    sound.play();

  };


  useEffect(() => {
    if (!payload?.answer) return;
    axios
      .get(`${process.env.REACT_APP_POKE_API_URL}/${payload.answer}`)
      .then((response) => {
        setPokemonToGuess(response.data);
      })
      .catch((error) => {
        console.error("Error al hacer la petición:", error);
      });

    console.log(payload)
  }, [payload?.answer]);

  return (
    <div className="card-container">
      <h2>Who is this Pokémon?</h2>

      <div className="pokemon-sprite">
        {pokemonToGuess ? (
          <img
            src={pokemonToGuess.sprites?.other?.dream_world?.front_default}
            alt="Pokemon to guess"
            className={`pokemon-image ${revealPokemon ? "reveal" : ""}`}
          />
        ) : (
          <p>Loading...</p>
        )}
      </div>

      <div>
        {payload.options.map((option, index) => (
          <button key={index} onClick={() => handleSubmitAnswer(option)}>
            {option}
          </button>
        ))}
      </div>


      <div>
        {showAnswerResult && (
          <div className=''>
            {correctAnswer ? "Correct!" : `Wrong! The correct answer was ${payload.answer}.`}
            <button onClick={handlePlayAgainClick}>Play Again</button>          </div>
        )}
      </div>
    </div>
  );
}

export default QuestionCard;
