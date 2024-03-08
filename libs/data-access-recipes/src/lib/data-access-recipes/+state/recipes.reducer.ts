import { EntityAdapter, EntityState, createEntityAdapter } from '@ngrx/entity';
import { Action, createReducer, on } from '@ngrx/store';

import * as RecipesActions from './recipes.actions';
import { RecipesEntity } from './recipes.models';

export const RECIPES_FEATURE_KEY = 'recipes';

export interface RecipesState extends EntityState<RecipesEntity> {
  selectedId?: string | number; // which Recipes record has been selected
  loaded: boolean; // has the Recipes list been loaded
  error?: string | null; // last known error (if any)
}

export interface RecipesPartialState {
  readonly [RECIPES_FEATURE_KEY]: RecipesState;
}

export const recipesAdapter: EntityAdapter<RecipesEntity> =
  createEntityAdapter<RecipesEntity>({
    selectId: (recipe) => recipe.id,
  });

export const initialRecipesState: RecipesState = recipesAdapter.getInitialState(
  {
    // set initial required properties
    loaded: false,
  },
);

const reducer = createReducer(
  initialRecipesState,
  on(RecipesActions.initRecipes, (state) => ({
    ...state,
    loaded: false,
    error: null,
  })),
  on(RecipesActions.loadRecipesSuccess, (state, { recipes }) => {
    console.log(recipes);
    return recipesAdapter.setAll(recipes, { ...state, loaded: true });
  }),
  on(RecipesActions.loadRecipesFailure, (state, { error }) => ({
    ...state,
    error,
  })),
);

export function recipesReducer(
  state: RecipesState | undefined,
  action: Action,
) {
  return reducer(state, action);
}