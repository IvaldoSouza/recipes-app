export async function CategoryFoodAPI() {
  const linkFoodCategory = 'https://www.themealdb.com/api/json/v1/1/list.php?c=list';
  const awaitFood = await fetch(linkFoodCategory);
  const awaitFoodToJSON = await awaitFood.json();
  return awaitFoodToJSON.meals.map((item) => Object.values(item)[0]);
// return awaitFoodToJSON;
}

export async function CategoryFoodFilter(param) {
  const linkFoodCategory = `https://www.themealdb.com/api/json/v1/1/search.php?s=${param}`;
  const awaitFood = await fetch(linkFoodCategory);
  const awaitFoodToJSON = await awaitFood.json();
  return awaitFoodToJSON.meals;
}