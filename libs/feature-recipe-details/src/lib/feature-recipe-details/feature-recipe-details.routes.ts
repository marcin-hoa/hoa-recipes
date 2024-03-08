import { Route } from '@angular/router';
import {
  RECIPES_FEATURE_KEY,
  RecipesEffects,
  RecipesRepository,
  recipesReducer,
} from '@hoa-recipes/data-access-recipes';
import { provideEffects } from '@ngrx/effects';
import { provideState } from '@ngrx/store';
import { FeatureRecipeDetailsComponent } from './feature-recipe-details.component';

export const featureRecipeDetailsRoutes: Route[] = [
  {
    loadComponent: () => FeatureRecipeDetailsComponent,
    path: ':id',
    providers: [
      provideState(RECIPES_FEATURE_KEY, recipesReducer),
      provideEffects(RecipesEffects),
      RecipesRepository,
    ],
  },
];
