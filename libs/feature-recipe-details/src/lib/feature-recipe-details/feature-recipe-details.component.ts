import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDialog } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import {
  RecipeDto,
  RecipesApiActions,
  RecipesUiActions,
  getSelectedRecipe,
} from '@hoa-recipes/data-access-recipes';
import { FeatureRecipeEditDialogComponent } from '@hoa-recipes/feature-recipe-edit-dialog';
import { UiConfirmationDialogService } from '@hoa-recipes/ui-confirmation-dialog';
import { UiRecipesPreparationTimeComponent } from '@hoa-recipes/ui-recipes-preparation-time';
import { Actions, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { distinctUntilChanged } from 'rxjs';

@Component({
  selector: 'hoa-recipes-feature-recipe-details',
  standalone: true,
  imports: [
    MatButtonModule,
    MatCardModule,
    MatIconModule,
    MatListModule,
    RouterModule,
    UiRecipesPreparationTimeComponent,
  ],
  providers: [UiConfirmationDialogService],
  templateUrl: './feature-recipe-details.component.html',
  styleUrl: './feature-recipe-details.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FeatureRecipeDetailsComponent {
  private store = inject(Store);
  private route = inject(ActivatedRoute);
  private actions = inject(Actions);
  private dialog = inject(MatDialog);
  private confirmationDialogService = inject(UiConfirmationDialogService);
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
  }

  openEditDialog(): void {
    this.dialog.open<FeatureRecipeEditDialogComponent, RecipeDto>(
      FeatureRecipeEditDialogComponent,
      {
        data: this.recipe() as RecipeDto,
      },
    );
  }

  openDeleteConfirmationDialog(): void {
    const { recipeName } = this.recipe() as RecipeDto;

    this.confirmationDialogService
      .open({
        text: `This will delete ${recipeName} and all its ingredients. This action cannot be undone.`,
        header: `Delete ${recipeName}?`,
        isDeleteConfirmation: true,
      })
      .subscribe((val) => {
        if (val) {
          this.store.dispatch(
            RecipesUiActions.deleteRecipe({
              recipeId: this.recipe()?.id as string,
            }),
          );
        }
      });
  }
}
