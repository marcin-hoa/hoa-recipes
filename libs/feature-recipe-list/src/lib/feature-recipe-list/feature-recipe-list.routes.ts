import { Route } from '@angular/router';
import {
  RECIPES_FEATURE_KEY,
  RecipesRepository,
  provideRecipeEffects,
  recipesReducer,
} from '@hoa-recipes/data-access-recipes';
import { provideState } from '@ngrx/store';

export const featureRecipeListRoutes: Route[] = [
  {
    loadComponent: () =>
      import('./feature-recipe-list.component').then(
        (c) => c.FeatureRecipeListComponent,
      ),
    path: '',
    providers: [
      provideState(RECIPES_FEATURE_KEY, recipesReducer),
      provideRecipeEffects(),
      RecipesRepository,
    ],
  },
];
