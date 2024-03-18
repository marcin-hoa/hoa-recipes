import {
  ChangeDetectionStrategy,
  Component,
  OnInit,
  inject,
} from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import {
  MAT_DIALOG_DATA,
  MatDialog,
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogTitle,
} from '@angular/material/dialog';
import {
  CreateRecipeDto,
  RecipeDto,
  RecipesApiActions,
  RecipesUiActions,
} from '@hoa-recipes/data-access-recipes';
import {
  UiRecipeEditFormComponent,
  UiRecipeFormPresenter,
} from '@hoa-recipes/ui-recipe-edit-form';
import { Actions, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';

@Component({
  selector: 'hoa-recipes-feature-recipe-edit-dialog',
  standalone: true,
  imports: [
    MatDialogActions,
    MatDialogClose,
    MatDialogContent,
    MatDialogTitle,
    MatButtonModule,
    UiRecipeEditFormComponent,
    ReactiveFormsModule,
  ],
  providers: [UiRecipeFormPresenter],
  templateUrl: './feature-recipe-edit-dialog.component.html',
  styleUrl: './feature-recipe-edit-dialog.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FeatureRecipeEditDialogComponent implements OnInit {
  formPresenter = inject(UiRecipeFormPresenter);
  dialogData?: RecipeDto = inject(MAT_DIALOG_DATA);
  isEditMode = this.dialogData !== null;

  private store = inject(Store);
  private actions = inject(Actions);
  private dialog = inject(MatDialog);

  constructor() {
    this.actions
      .pipe(
        ofType(
          RecipesApiActions.createRecipeSuccess,
          RecipesApiActions.editRecipeSuccess,
        ),
        takeUntilDestroyed(),
      )
      .subscribe(() => {
        this.dialog.closeAll();
      });
  }

  ngOnInit(): void {
    if (this.isEditMode) {
      this.formPresenter.setInitialData(this.dialogData as CreateRecipeDto);
    }
  }

  confirm(): void {
    const formValue = this.formPresenter.form.getRawValue();

    if (this.isEditMode) {
      this.store.dispatch(
        RecipesUiActions.editRecipe({
          recipeDto: { ...formValue, id: this.dialogData?.id as string },
        }),
      );
    } else {
      this.store.dispatch(
        RecipesUiActions.createRecipe({
          recipeDto: formValue,
        }),
      );
    }
  }
}
