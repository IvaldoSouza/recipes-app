import {
  REQUEST_DETAILS,
  RECEIVE_DETAILS_FAILURE,
  RECEIVE_MEAL_DETAILS_SUCCESS,
  RECEIVE_DRINK_DETAILS_SUCCESS,
} from '../actions/recipeDetailsActions';

const INITIAL_STATE = {
  meal: {},
  drink: {},
  isLoading: false,
  error: null,
};
console.log(INITIAL_STATE.meal);

const recipeDetailsReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case REQUEST_DETAILS:
    return {
      ...state,
      isLoading: true,
    };
  case RECEIVE_DETAILS_FAILURE:
    return {
      ...state,
      isLoading: false,
      error: action.error,
    };
  case RECEIVE_MEAL_DETAILS_SUCCESS:
    return {
      ...state,
      meal: action.details[0],
      isLoading: false,
    };
  case RECEIVE_DRINK_DETAILS_SUCCESS:
    return {
      ...state,
      drink: action.details[0],
      isLoading: false,
    };
  default:
    return state;
  }
};

export default recipeDetailsReducer;
