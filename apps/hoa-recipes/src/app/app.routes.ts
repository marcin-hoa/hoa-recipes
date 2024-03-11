import { Route } from '@angular/router';
import { featureRecipeDetailsRoutes } from '@hoa-recipes/feature-recipe-details';

export const appRoutes: Route[] = [
  ...featureRecipeDetailsRoutes,
  {
    path: '',
    redirectTo: '',
    pathMatch: 'full',
  },
];
