import { createFeatureSelector, createSelector } from '@ngrx/store';
import {
  RECIPES_FEATURE_KEY,
  RecipesState,
  recipesAdapter,
} from './recipes.reducer';

// Lookup the 'Recipes' feature state managed by NgRx
export const selectRecipesState =
  createFeatureSelector<RecipesState>(RECIPES_FEATURE_KEY);

const { selectAll, selectEntities } = recipesAdapter.getSelectors();

export const selectRecipesLoaded = createSelector(
  selectRecipesState,
  (state: RecipesState) => state.loaded,
);

export const selectRecipesError = createSelector(
  selectRecipesState,
  (state: RecipesState) => state.error,
);

export const selectAllRecipes = createSelector(
  selectRecipesState,
  (state: RecipesState) => {
    return selectAll(state);
  },
);

export const selectRecipesEntities = createSelector(
  selectRecipesState,
  (state: RecipesState) => selectEntities(state),
);

export const setSelectedRecipeId = createSelector(
  selectRecipesState,
  (state: RecipesState) => state.selectedId,
);

export const getSelectedRecipe = createSelector(
  selectRecipesEntities,
  setSelectedRecipeId,
  (entities, selectedId) => {
    return selectedId ? entities[selectedId] : undefined;
  },
);

export const getSearchPhrase = createSelector(
  selectRecipesState,
  (state) => state.searchPhrase,
);

export const getFilteredRecipes = createSelector(
  selectAllRecipes,
  getSearchPhrase,
  (recipes, searchPhrase) => {
    return recipes.filter((r) => {
      const phrase = searchPhrase.trim().toLowerCase();

      const recipeNameMatch = r.recipeName.toLowerCase().includes(phrase);
      const recipeIngredientMatch = r.ingredients.some((ing) =>
        ing.ingredientName.toLowerCase().includes(phrase),
      );

      return recipeNameMatch || recipeIngredientMatch;
    });
  },
);
