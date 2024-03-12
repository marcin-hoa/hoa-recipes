import { STEPPER_GLOBAL_OPTIONS } from '@angular/cdk/stepper';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import {
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogTitle,
} from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatStepperModule } from '@angular/material/stepper';
import { FeatureRecipeFormService } from './feature-recipe-form.service';

@Component({
  selector: 'hoa-recipes-feature-recipe-edit-dialog',
  standalone: true,
  imports: [
    MatDialogActions,
    MatDialogClose,
    MatDialogContent,
    MatDialogTitle,
    MatButtonModule,
    MatStepperModule,
    MatInputModule,
    MatFormFieldModule,
    ReactiveFormsModule,
  ],
  providers: [
    {
      provide: STEPPER_GLOBAL_OPTIONS,
      useValue: { showError: true },
    },
    FeatureRecipeFormService,
  ],
  templateUrl: './feature-recipe-edit-dialog.component.html',
  styleUrl: './feature-recipe-edit-dialog.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FeatureRecipeEditDialogComponent {
  formService = inject(FeatureRecipeFormService);

  addIngredient(): void {
    this.formService.addIngredientFormControl();
  }

  logForm(): void {
    console.log(this.formService.form.value);
  }
}
