import { Route } from '@angular/router';
import {
  RECIPES_FEATURE_KEY,
  RecipesEffects,
  RecipesRepository,
  recipesReducer,
} from '@hoa-recipes/data-access-recipes';
import { provideEffects } from '@ngrx/effects';
import { provideState } from '@ngrx/store';
import { FeatureRecipeListComponent } from './feature-recipe-list.component';

export const featureRecipeListRoutes: Route[] = [
  {
    loadComponent: () => FeatureRecipeListComponent,
    path: '',
    providers: [
      provideState(RECIPES_FEATURE_KEY, recipesReducer),
      provideEffects(RecipesEffects),
      RecipesRepository,
    ],
  },
];
