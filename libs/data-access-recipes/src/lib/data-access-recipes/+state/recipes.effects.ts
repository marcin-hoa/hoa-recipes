import { inject, makeEnvironmentProviders } from '@angular/core';
import { Actions, createEffect, ofType, provideEffects } from '@ngrx/effects';
import { catchError, map, of, switchMap } from 'rxjs';
import { RecipesRepository } from '../recipes.repository';
import { RecipesApiActions } from './recipes.actions';

const loadAll$ = createEffect(
  (actions$ = inject(Actions)) => {
    const repo = inject(RecipesRepository);

    return actions$.pipe(
      ofType(RecipesApiActions.load),
      switchMap(() =>
        repo.findAll().pipe(
          map((res) =>
            RecipesApiActions.loadRecipesSuccess({
              recipes: res,
            }),
          ),
        ),
      ),
      catchError((error) => {
        console.error('Error', error);
        return of(RecipesApiActions.loadRecipesFailure({ error }));
      }),
    );
  },
  { functional: true },
);

export const provideRecipeEffects = () =>
  makeEnvironmentProviders([provideEffects({ loadAll$ })]);
