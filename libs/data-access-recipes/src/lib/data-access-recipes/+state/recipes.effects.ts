import { Injectable, inject } from '@angular/core';
import { Actions, OnInitEffects, createEffect, ofType } from '@ngrx/effects';
import { Action } from '@ngrx/store';
import { catchError, map, of, switchMap } from 'rxjs';
import { RecipesRepository } from '../recipes.repository';
import { RecipesActions } from './recipes.actions';

@Injectable()
export class RecipesEffects implements OnInitEffects {
  private actions$ = inject(Actions);
  private repo = inject(RecipesRepository);

  init$ = createEffect(() =>
    this.actions$.pipe(
      ofType(RecipesActions.init),
      switchMap(() =>
        this.repo.getAll().pipe(
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
    ),
  );

  ngrxOnInitEffects(): Action {
    return RecipesActions.init();
  }
}
