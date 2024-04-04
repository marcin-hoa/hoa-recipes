import { Injectable, inject } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import {
  RecipeDto,
  RecipesApiActions,
  RecipesUiActions,
  getSelectedRecipe,
} from '@hoa-recipes/data-access-recipes';
import { Actions, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { distinctUntilChanged } from 'rxjs';

@Injectable()
export class FeatureRecipeDetailsService {
  private store = inject(Store);
  private route = inject(ActivatedRoute);
  private actions = inject(Actions);
  private dialog = inject(MatDialog);
  private router = inject(Router);

  recipe = this.store.selectSignal(getSelectedRecipe);

  constructor() {
    this.route.paramMap
      .pipe(distinctUntilChanged(), takeUntilDestroyed())
      .subscribe((r) => {
        const recipeId = r.get('id');
        this.store.dispatch(
          RecipesUiActions.selectRecipe({ selectedId: recipeId as string }),
        );
      });

    this.actions
      .pipe(ofType(RecipesApiActions.deleteRecipeSuccess), takeUntilDestroyed())
      .subscribe(() => {
        this.router.navigate(['/']);
      });

    this.actions
      .pipe(
        ofType(RecipesApiActions.uploadRecipeImageSuccess),
        takeUntilDestroyed(),
      )
      .subscribe((res) => {
        this.store.dispatch(
          RecipesUiActions.editRecipe({
            recipeDto: {
              ...(this.recipe() as RecipeDto),
              imageName: res.fileName,
            },
          }),
        );
        this.dialog.closeAll();
      });

    this.actions
      .pipe(
        ofType(RecipesApiActions.deleteRecipeImageSuccess),
        takeUntilDestroyed(),
      )
      .subscribe(() => {
        this.store.dispatch(
          RecipesUiActions.editRecipe({
            recipeDto: {
              ...(this.recipe() as RecipeDto),
              imageName: '',
            },
          }),
        );
        this.dialog.closeAll();
      });
  }
}
