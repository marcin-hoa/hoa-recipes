import { Route } from '@angular/router';
import {
  RECIPES_FEATURE_KEY,
  RecipesEffects,
  RecipesRepository,
  recipesReducer,
} from '@hoa-recipes/data-access-recipes';
import { FeatureRecipeDetailsComponent } from '@hoa-recipes/feature-recipe-details';
import { provideEffects } from '@ngrx/effects';
import { provideState } from '@ngrx/store';
import { FeatureRecipeListComponent } from './feature-recipe-list.component';

export const featureRecipeListRoutes: Route[] = [
  {
    component: FeatureRecipeListComponent,
    path: '',
    providers: [
      provideState(RECIPES_FEATURE_KEY, recipesReducer),
      provideEffects(RecipesEffects),
      RecipesRepository,
    ],
    children: [
      {
        loadComponent: () => FeatureRecipeDetailsComponent,
        path: ':id',
      },
    ],
  },
];
