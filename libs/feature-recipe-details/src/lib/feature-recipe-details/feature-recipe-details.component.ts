import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDialog } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatMenuModule } from '@angular/material/menu';
import { RouterModule } from '@angular/router';
import { RecipeDto, RecipesUiActions } from '@hoa-recipes/data-access-recipes';
import { FeatureRecipeEditDialogComponent } from '@hoa-recipes/feature-recipe-edit-dialog';
import { UiConfirmationDialogService } from '@hoa-recipes/ui-confirmation-dialog';
import { UiImageUploadDialogComponent } from '@hoa-recipes/ui-image-upload-dialog';
import { UiRecipesPreparationTimeComponent } from '@hoa-recipes/ui-recipes-preparation-time';
import { Store } from '@ngrx/store';
import { FeatureRecipeDetailsService } from './feature-recipe-details.service';

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
    MatMenuModule,
  ],
  providers: [UiConfirmationDialogService, FeatureRecipeDetailsService],
  templateUrl: './feature-recipe-details.component.html',
  styleUrl: './feature-recipe-details.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FeatureRecipeDetailsComponent {
  private store = inject(Store);
  private dialog = inject(MatDialog);
  private confirmationDialogService = inject(UiConfirmationDialogService);
  private recipeDetailsService = inject(FeatureRecipeDetailsService);

  recipe = this.recipeDetailsService.recipe;

  openEditDialog(): void {
    this.dialog.open<FeatureRecipeEditDialogComponent, RecipeDto>(
      FeatureRecipeEditDialogComponent,
      {
        data: this.recipe() as RecipeDto,
      },
    );
  }

  openDeleteConfirmationDialog(): void {
    const { recipeName, id } = this.recipe() as RecipeDto;

    this.confirmationDialogService
      .open$({
        text: `This will delete ${recipeName} and all its ingredients. This action cannot be undone.`,
        header: `Delete ${recipeName}?`,
        isDeleteConfirmation: true,
      })
      .subscribe((val) => {
        if (val) {
          this.store.dispatch(
            RecipesUiActions.deleteRecipe({
              recipeId: id,
            }),
          );
        }
      });
  }

  openImageEditDialog(): void {
    this.dialog.open<UiImageUploadDialogComponent, RecipeDto>(
      UiImageUploadDialogComponent,
      {
        data: this.recipe(),
      },
    );
  }
}
