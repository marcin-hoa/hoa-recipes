import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDialog } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { ActivatedRoute, RouterModule } from '@angular/router';
import {
  RecipeDto,
  RecipesUiActions,
  getSelectedRecipe,
} from '@hoa-recipes/data-access-recipes';
import { FeatureRecipeEditDialogComponent } from '@hoa-recipes/feature-recipe-edit-dialog';
import { UiRecipesPreparationTimeComponent } from '@hoa-recipes/ui-recipes-preparation-time';
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
  templateUrl: './feature-recipe-details.component.html',
  styleUrl: './feature-recipe-details.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FeatureRecipeDetailsComponent {
  private store = inject(Store);
  private route = inject(ActivatedRoute);
  private dialog = inject(MatDialog);

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
  }

  openEditDialog(): void {
    this.dialog.open<FeatureRecipeEditDialogComponent, RecipeDto>(
      FeatureRecipeEditDialogComponent,
      {
        data: this.recipe() as RecipeDto,
      },
    );
  }
}
