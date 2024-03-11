import { Route } from '@angular/router';
import { featureRecipeRoutes } from '@hoa-recipes/feature-recipe-list';

export const appRoutes: Route[] = [
  ...featureRecipeRoutes,
  {
    path: '',
    redirectTo: '',
    pathMatch: 'full',
  },
];
