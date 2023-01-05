import { Recipe } from '../recipe.model';
import * as RecipeActions from './recipe.actions';

export interface State {
  recipes: Recipe[];
}

const initialState: State = {
  recipes: [],
};

export function RecipeReducer(
  state: State = initialState,
  action: RecipeActions.RecipeActions
) {
  switch (action.type) {
    case RecipeActions.SET_RECIPES:
      return {
        ...state,
        recipes: [...action.payload],
      };
    case RecipeActions.ADD_RECIPE:
      return {
        ...state,
        recipes: [...state.recipes, action.payload],
      };
    case RecipeActions.UPDATE_RECIPE:
      const updRecipe = {
        ...state.recipes[action.payload.index],
        ...action.payload.newRecipe,
      };
      const updRecipes = [...state.recipes];
      updRecipes[action.payload.index] = updRecipe;
      return {
        ...state,
        recipes: updRecipes,
      };
    case RecipeActions.DELETE_RECIPE:
      return {
        ...state,
        recipes: state.recipes.filter((_, index) => {
          return index !== action.payload;
        }),
      };
    default:
      return {
        ...state,
      };
  }
}
