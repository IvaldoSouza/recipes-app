import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { Card, Button } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import getFood from '../services/SearchRecipe';

export default function FoodCard() {
  const [foodList, setFoodList] = useState();
  const history = useHistory();
  const recipes = useSelector((state) => state.recipes);

  const { formInfo } = recipes;

  useEffect(() => {
    (async () => {
      const food = await getFood(formInfo, 'meals');
      setFoodList(food);
    })();
  }, [formInfo]);

  const getCards = () => {
    if (foodList) {
      return foodList.map((item, index) => {
        const { idMeal, strMeal, strMealThumb, strCategory, strTags } = item;
        return (
          <Card key={ index }>
            <Card.Header>{strCategory}</Card.Header>
            <Card.Img variant="top" src={ strMealThumb } />
            <Card.Body>
              <Card.Title>{strMeal}</Card.Title>
              <Card.Text>{strTags}</Card.Text>
            </Card.Body>
            <Card.Footer>
              <Button
                className="card-button"
                onClick={ () => history.push(`/comidas/${idMeal}`) }
                variant="primary"
              >
                Ver receita
              </Button>
            </Card.Footer>
          </Card>
        );
      });
    }
  };

  return <div className="food-cards">{getCards()}</div>;
}
