import { inject, makeEnvironmentProviders } from '@angular/core';
import { Actions, createEffect, ofType, provideEffects } from '@ngrx/effects';
import { catchError, exhaustMap, map, of, switchMap } from 'rxjs';
import { RecipesRepository } from '../recipes.repository';
import { RecipesApiActions, RecipesUiActions } from './recipes.actions';

const loadAll$ = createEffect(
  (actions$ = inject(Actions)) => {
    const repo = inject(RecipesRepository);

    return actions$.pipe(
      ofType(RecipesUiActions.load),
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

const createRecipe$ = createEffect(
  (actions$ = inject(Actions)) => {
    const repo = inject(RecipesRepository);

    return actions$.pipe(
      ofType(RecipesUiActions.createRecipe),
      exhaustMap((action) => {
        return repo.create(action.recipeDto).pipe(
          map((res) => {
            return RecipesApiActions.createRecipeSuccess({
              createdRecipe: res,
            });
          }),
        );
      }),
      catchError((error) => {
        console.error('Error', error);
        return of(RecipesApiActions.createRecipeFailure({ error }));
      }),
    );
  },
  { functional: true },
);

const editRecipe$ = createEffect(
  (actions$ = inject(Actions)) => {
    const repo = inject(RecipesRepository);

    return actions$.pipe(
      ofType(RecipesUiActions.editRecipe),
      exhaustMap((action) => {
        return repo.update(action.recipeDto).pipe(
          map((res) => {
            return RecipesApiActions.editRecipeSuccess({
              updatedRecipe: res,
            });
          }),
        );
      }),
      catchError((error) => {
        console.error('Error', error);
        return of(RecipesApiActions.editRecipeFailure({ error }));
      }),
    );
  },
  { functional: true },
);

export const provideRecipeEffects = () =>
  makeEnvironmentProviders([
    provideEffects({ loadAll$, createRecipe$, editRecipe$ }),
  ]);
