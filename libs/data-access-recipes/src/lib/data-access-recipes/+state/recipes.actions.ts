import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { RecipesEntity } from './recipes.models';

export const RecipesApiActions = createActionGroup({
  source: 'Recipes/API',
  events: {
    load: emptyProps(),
    'Load Recipes Success': props<{ recipes: RecipesEntity[] }>(),
    'Load Recipes Failure': props<{ error: string }>(),
    'Load Recipe Success': props<{ recipe: RecipesEntity }>(),
    'Load Recipe Failure': props<{ error: string }>(),
  },
});

export const RecipesUiActions = createActionGroup({
  source: 'Recipes/UI',
  events: {
    'Select Recipe': props<{ recipeId: string }>(),
  },
});
