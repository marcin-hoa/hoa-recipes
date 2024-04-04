import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { CreateRecipeDto, RecipeDto } from '../dto/RecipeDto';
import { RecipesEntity } from './recipes.models';

export const RecipesApiActions = createActionGroup({
  source: 'Recipes/API',
  events: {
    'Load Recipes Success': props<{ recipes: RecipesEntity[] }>(),
    'Load Recipes Failure': props<{ error: string }>(),

    'Create Recipe Failure': props<{ error: string }>(),
    'Create Recipe Success': props<{ recipeDto: RecipesEntity }>(),

    'Edit Recipe Failure': props<{ error: string }>(),
    'Edit Recipe Success': props<{ recipeDto: RecipesEntity }>(),

    'Delete Recipe Success': props<{ recipeId: string }>(),
    'Delete Recipe Failure': props<{ error: string }>(),

    'Upload Recipe Image Success': props<{ fileName: string }>(),
    'Upload Recipe Image Failure': props<{ error: string }>(),

    'Delete Recipe Image Success': emptyProps(),
    'Delete Recipe Image Failure': props<{ error: string }>(),
  },
});

export const RecipesUiActions = createActionGroup({
  source: 'Recipes/UI',
  events: {
    load: emptyProps(),
    'Select Recipe': props<{ selectedId: string }>(),

    'Create Recipe': props<{ recipeDto: CreateRecipeDto }>(),

    'Edit Recipe': props<{ recipeDto: RecipeDto }>(),

    'Delete recipe': props<{ recipeId: string }>(),

    'Set Search Phrase': props<{ searchPhrase: string }>(),

    'Upload Recipe Image': props<{
      recipe: RecipesEntity;
      image: File;
    }>(),

    'Delete Recipe Image': props<{ fileName: string }>(),
  },
});
