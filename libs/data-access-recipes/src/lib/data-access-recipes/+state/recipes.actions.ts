import { createAction, props } from '@ngrx/store';
import { RecipesEntity } from './recipes.models';

export const initRecipes = createAction('[Recipes Page] Init');

export const loadRecipesSuccess = createAction(
  '[Recipes/API] Load Recipes Success',
  props<{ recipes: RecipesEntity[] }>(),
);

export const loadRecipesFailure = createAction(
  '[Recipes/API] Load Recipes Failure',
  props<{ error: any }>(),
);
