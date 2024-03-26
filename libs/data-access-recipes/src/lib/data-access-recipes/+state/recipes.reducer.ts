import { EntityAdapter, EntityState, createEntityAdapter } from '@ngrx/entity';
import { createReducer, on } from '@ngrx/store';

import { RecipesApiActions, RecipesUiActions } from './recipes.actions';
import { RecipesEntity } from './recipes.models';

export const RECIPES_FEATURE_KEY = 'recipes';

export interface RecipesState extends EntityState<RecipesEntity> {
  selectedId?: string | number; // which Recipes record has been selected
  loaded: boolean; // has the Recipes list been loaded
  error?: string | null; // last known error (if any)
  searchPhrase: string;
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
    searchPhrase: '',
  },
);

export const recipesReducer = createReducer<RecipesState>(
  initialRecipesState,
  on(RecipesUiActions.load, (state) => ({
    ...state,
    loaded: false,
    error: null,
  })),

  on(RecipesApiActions.loadRecipesSuccess, (state, { recipes }) => {
    return recipesAdapter.setAll(recipes, { ...state, loaded: true });
  }),

  on(RecipesApiActions.loadRecipesFailure, (state, { error }) => ({
    ...state,
    error,
  })),

  on(RecipesUiActions.selectRecipe, (state, { selectedId }) => ({
    ...state,
    selectedId,
  })),

  on(RecipesApiActions.createOrModifyRecipeSuccess, (state, { recipeDto }) => {
    return recipesAdapter.upsertOne(recipeDto, {
      ...state,
      selectedId: recipeDto.id,
    });
  }),

  on(RecipesApiActions.deleteRecipeSuccess, (state, { recipeId }) => {
    return recipesAdapter.removeOne(recipeId, state);
  }),

  on(RecipesUiActions.setSearchPhrase, (state, { searchPhrase }) => ({
    ...state,
    searchPhrase: searchPhrase,
  })),
);
