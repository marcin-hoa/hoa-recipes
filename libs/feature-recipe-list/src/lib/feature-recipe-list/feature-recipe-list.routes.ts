import { Route } from '@angular/router';
import { provideEffects } from '@ngrx/effects';
import { provideState } from '@ngrx/store';
import { RecipesRepository } from 'libs/data-access-recipes/src';
import { RecipesEffects } from '../../../../data-access-recipes/src/lib/data-access-recipes/+state/recipes.effects';
import * as fromRecipes from '../../../../data-access-recipes/src/lib/data-access-recipes/+state/recipes.reducer';
import { FeatureRecipeListComponent } from './feature-recipe-list.component';

export const featureRecipeListRoutes: Route[] = [
  {
    component: FeatureRecipeListComponent,
    path: '',
    providers: [
      provideState(fromRecipes.RECIPES_FEATURE_KEY, fromRecipes.recipesReducer),
      provideEffects(RecipesEffects),
      RecipesRepository,
    ],
  },
];
