import { Route } from '@angular/router';
import { FeatureRecipeDetailsComponent } from './feature-recipe-details.component';

export const featureRecipeDetailsRoutes: Route[] = [
  {
    loadComponent: () => FeatureRecipeDetailsComponent,
    path: ':id',
  },
];
