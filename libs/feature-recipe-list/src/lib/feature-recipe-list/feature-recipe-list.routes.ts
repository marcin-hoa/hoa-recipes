import { Route } from '@angular/router';
import { RecipesRepository } from '@hoa-recipes/data-access-api';
import { provideEffects } from '@ngrx/effects';
import { provideState } from '@ngrx/store';
import { RecipesEffects } from './+state/recipes.effects';
import * as fromRecipes from './+state/recipes.reducer';
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
