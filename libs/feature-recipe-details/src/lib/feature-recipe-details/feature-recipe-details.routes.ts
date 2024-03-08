import { Route } from '@angular/router';
import {
  RECIPES_FEATURE_KEY,
  RecipesRepository,
  provideRecipeEffects,
  recipesReducer,
} from '@hoa-recipes/data-access-recipes';
import { provideState } from '@ngrx/store';
import { FeatureRecipeDetailsComponent } from './feature-recipe-details.component';

export const featureRecipeDetailsRoutes: Route[] = [
  {
    loadComponent: () => FeatureRecipeDetailsComponent,
    path: ':id',
    providers: [
      provideState(RECIPES_FEATURE_KEY, recipesReducer),
      provideRecipeEffects(),
      RecipesRepository,
    ],
  },
];
