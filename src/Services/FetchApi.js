const globalFetch = async (URL) => {
  const response = await fetch(URL);
  const json = await response.json();
  return json;
};

export const fetchIngredient = async (site, ingrediente) => {
  const URL = `https://www.the${site}db.com/api/json/v1/1/filter.php?i=${ingrediente}`;
  const result = await globalFetch(URL);
  return result;
};

export const fetchName = async (site, nome) => {
  const URL = `https://www.the${site}db.com/api/json/v1/1/search.php?s=${nome}`;
  const result = await globalFetch(URL);
  return result;
};

export const fetchFirstLetter = async (site, primeiraLetra) => {
  const URL = `https://www.the${site}db.com/api/json/v1/1/search.php?f=${primeiraLetra}`;
  const result = await globalFetch(URL);
  return result;
};

export const fetchDetailsRecipe = async () => {
  const URL = 'https://www.themealdb.com/api/json/v1/1/lookup.php?i=52772';
  const response = await fetch(URL);
  const data = await response.json();
  return data;
};