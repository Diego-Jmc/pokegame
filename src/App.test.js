import { generateRandomNumber, getRandomSubset, generateRandomSubsetOfPokemons } from './utils/functionsToTest';


describe('Util functions', () => {

  test('generateRandomNumber generates a correct number whitin the size', () => {
    const min = 1;
    const max = 10;
    const num = generateRandomNumber(min, max);

    expect(num).toBeGreaterThanOrEqual(min);
    expect(num).toBeLessThanOrEqual(max);
  });

  test('getRandomSubset retrieves the correct size', () => {
    const arr = ['a', 'b', 'c', 'd', 'e'];
    const subset = getRandomSubset(arr, 3);

    expect(subset).toHaveLength(3);
    subset.forEach(item => expect(arr).toContain(item));
  });

  test('generateRandomSubsetOfPokemons retreives a valid payload', () => {
    const pokemons = ['pikachu', 'charmander', 'bulbasaur', 'squirtle'];
    const payload = generateRandomSubsetOfPokemons(pokemons);

    expect(payload).toHaveProperty('answer');
    expect(payload).toHaveProperty('options');
    expect(Array.isArray(payload.options)).toBe(true);
    expect(payload.options).toContain(payload.answer);
    expect(payload.options.length).toBe(4);
  });

});
