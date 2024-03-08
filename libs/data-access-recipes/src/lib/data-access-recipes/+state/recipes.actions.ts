import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { RecipesEntity } from './recipes.models';

export const RecipesActions = createActionGroup({
  source: '[Recipes/API]',
  events: {
    init: emptyProps(),
    'Load Recipes Success': props<{ recipes: RecipesEntity[] }>(),
    'Load Recipes Failure': props<{ error: any }>(),
  },
});
