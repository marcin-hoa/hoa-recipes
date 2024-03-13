import { Route } from '@angular/router';

export const featureRecipeRoutes: Route[] = [
  {
    loadComponent: () =>
      import('./feature-recipe-list.component').then(
        (c) => c.FeatureRecipeListComponent,
      ),
    path: '',
    providers: [],
    children: [
      {
        loadComponent: () =>
          import('@hoa-recipes/feature-recipe-details').then(
            (c) => c.FeatureRecipeDetailsComponent,
          ),
        path: ':id',
      },
    ],
  },
];
