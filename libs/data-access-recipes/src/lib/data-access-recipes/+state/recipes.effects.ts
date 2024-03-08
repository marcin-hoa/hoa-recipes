import { inject, makeEnvironmentProviders } from '@angular/core';
import { Actions, createEffect, ofType, provideEffects } from '@ngrx/effects';
import { catchError, map, of, switchMap } from 'rxjs';
import { RecipesRepository } from '../recipes.repository';
import { RecipesActions } from './recipes.actions';

const load$ = createEffect(
  (actions$ = inject(Actions)) => {
    const repo = inject(RecipesRepository);

    return actions$.pipe(
      ofType(RecipesActions.load),
      switchMap(() =>
        repo.getAll().pipe(
          map((res) =>
            RecipesActions.loadRecipesSuccess({
              recipes: res,
            }),
          ),
        ),
      ),
      catchError((error) => {
        console.error('Error', error);
        return of(RecipesActions.loadRecipesFailure({ error }));
      }),
    );
  },
  { functional: true },
);

export const provideRecipeEffects = () =>
  makeEnvironmentProviders([provideEffects({ load$ })]);
