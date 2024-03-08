import { Route } from '@angular/router';
import { featureRecipeListRoutes } from '@hoa-recipes/feature-recipe-list';

export const appRoutes: Route[] = [
  ...featureRecipeListRoutes,
  // ...featureRecipeDetailsRoutes,
  {
    path: '',
    redirectTo: '',
    pathMatch: 'full',
  },
];
