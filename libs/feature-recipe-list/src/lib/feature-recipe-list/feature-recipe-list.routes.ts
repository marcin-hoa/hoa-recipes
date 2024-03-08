import { Route } from '@angular/router';
import {
  RECIPES_FEATURE_KEY,
  RecipesRepository,
  provideRecipeEffects,
  recipesReducer,
} from '@hoa-recipes/data-access-recipes';
import { provideState } from '@ngrx/store';
import { FeatureRecipeListComponent } from './feature-recipe-list.component';

export const featureRecipeListRoutes: Route[] = [
  {
    loadComponent: () => FeatureRecipeListComponent,
    path: '',
    providers: [
      provideState(RECIPES_FEATURE_KEY, recipesReducer),
      provideRecipeEffects(),
      RecipesRepository,
    ],
  },
];
