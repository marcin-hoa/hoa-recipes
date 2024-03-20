import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { CreateRecipeDto, RecipeDto } from '../dto/RecipeDto';
import { RecipesEntity } from './recipes.models';

export const RecipesApiActions = createActionGroup({
  source: 'Recipes/API',
  events: {
    'Load Recipes Success': props<{ recipes: RecipesEntity[] }>(),
    'Load Recipes Failure': props<{ error: string }>(),

    'Create Recipe Success': props<{ createdRecipe: RecipesEntity }>(),
    'Create Recipe Failure': props<{ error: string }>(),

    'Edit Recipe Success': props<{ updatedRecipe: RecipesEntity }>(),
    'Edit Recipe Failure': props<{ error: string }>(),
  },
});

export const RecipesUiActions = createActionGroup({
  source: 'Recipes/UI',
  events: {
    load: emptyProps(),
    'Select Recipe': props<{ selectedId: string }>(),
    'Create Recipe': props<{ recipeDto: CreateRecipeDto }>(),
    'Edit Recipe': props<{ recipeDto: RecipeDto }>(),
    'Set Search Phrase': props<{ searchPhrase: string }>(),
  },
});
