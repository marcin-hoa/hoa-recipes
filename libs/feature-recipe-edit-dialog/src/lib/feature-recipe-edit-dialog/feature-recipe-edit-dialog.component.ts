import {
  AfterContentInit,
  ChangeDetectionStrategy,
  Component,
  inject,
} from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import {
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogTitle,
} from '@angular/material/dialog';
import {
  UiRecipeEditFormComponent,
  UiRecipeFormPresenter,
} from '@hoa-recipes/ui-recipe-edit-form';

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
export class FeatureRecipeEditDialogComponent implements AfterContentInit {
  formService = inject(UiRecipeFormPresenter);

  createRecipe(): void {
    console.log(this.formService.form.value);
  }

  ngAfterContentInit(): void {
    this.formService.form.valueChanges.subscribe(() => {
      console.log(this.formService.form.valid);
    });
  }
}
