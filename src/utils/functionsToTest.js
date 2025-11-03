export function generateRandomNumber(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

export function getRandomSubset(array, size) {
  const shuffled = [...array].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, size);
}

export function generateRandomSubsetOfPokemons(pokemons) {
  const pokemon = pokemons[generateRandomNumber(0, pokemons.length - 1)];
  const options = getRandomSubset(pokemons.filter(p => p !== pokemon), 3);
  options.push(pokemon);

  return {
    answer: pokemon,
    options: options.sort(() => 0.5 - Math.random()),
  };
}
