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

      <div className="d-flex justify-content-center mt-4 mb-3">
        <h2 className="text-center fw-bold">Who is this Pokémon?</h2>
      </div>


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

      <div className="d-flex flex-column align-items-center gap-2 mt-3 options-button-container">
        {payload.options.map((option, index) => (
          <button
            key={index}
            className="btn btn-secondary w-75"
            onClick={() => handleSubmitAnswer(option)}
          >
            {option.charAt(0).toUpperCase() + option.slice(1).toLowerCase()}
          </button>
        ))}
      </div>

      <div>
        {showAnswerResult && (
          <div className="d-flex flex-column justify-content-center align-items-center gap-3 mt-4">
            <p className="fs-5 fw-semibold text-center mb-0">
              {correctAnswer
                ? "✅ Correct!"
                : `❌ Wrong! The correct answer was ${payload.answer}.`}
            </p>
            <button className="btn btn-danger px-4 py-2" onClick={handlePlayAgainClick}>
              Play Again
            </button>
          </div>
        )}
      </div>


    </div>
  );
}

export default QuestionCard;
