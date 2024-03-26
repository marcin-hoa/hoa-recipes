import { inject, makeEnvironmentProviders } from '@angular/core';
import { Actions, createEffect, ofType, provideEffects } from '@ngrx/effects';
import { catchError, exhaustMap, map, of, switchMap } from 'rxjs';
import { CreateRecipeDto } from '../dto/RecipeDto';
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
      exhaustMap(
        (action: {
          recipeDto: CreateRecipeDto;
          recipeImage: File | undefined;
        }) => {
          return repo.create(action.recipeDto).pipe(
            map((res) => {
              return action.recipeImage === undefined
                ? RecipesApiActions.createOrModifyRecipeSuccess({
                    recipeDto: res,
                  })
                : RecipesUiActions.uploadRecipeImage({
                    image: action.recipeImage,
                    recipe: res,
                  });
            }),
          );
        },
      ),
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
            return action.recipeImage === undefined
              ? RecipesApiActions.createOrModifyRecipeSuccess({
                  recipeDto: res,
                })
              : RecipesUiActions.uploadRecipeImage({
                  image: action.recipeImage,
                  recipe: res,
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

const deleteRecipe$ = createEffect(
  (actions$ = inject(Actions)) => {
    const repo = inject(RecipesRepository);

    return actions$.pipe(
      ofType(RecipesUiActions.deleteRecipe),
      exhaustMap((action) => {
        return repo.delete(action.recipeId).pipe(
          map(() => {
            return RecipesApiActions.deleteRecipeSuccess({
              recipeId: action.recipeId,
            });
          }),
        );
      }),
      catchError((error) => {
        console.error('Error', error);
        return of(RecipesApiActions.deleteRecipeFailure({ error }));
      }),
    );
  },
  { functional: true },
);

const uploadRecipeImage$ = createEffect(
  (actions$ = inject(Actions)) => {
    const repo = inject(RecipesRepository);

    return actions$.pipe(
      ofType(RecipesUiActions.uploadRecipeImage),
      exhaustMap((action) => {
        return repo.uploadImage(action.recipe.id, action.image).pipe(
          map(() => {
            return RecipesApiActions.createOrModifyRecipeSuccess({
              recipeDto: action.recipe,
            });
          }),
        );
      }),
      catchError((error) => {
        console.error('Error', error);
        return of(RecipesApiActions.uploadRecipeImageFailure({ error }));
      }),
    );
  },
  { functional: true },
);

export const provideRecipeEffects = () =>
  makeEnvironmentProviders([
    provideEffects({
      loadAll$,
      createRecipe$,
      editRecipe$,
      deleteRecipe$,
      uploadRecipeImage$,
    }),
  ]);
