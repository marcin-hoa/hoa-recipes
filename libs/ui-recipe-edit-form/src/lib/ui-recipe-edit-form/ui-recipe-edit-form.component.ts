import { STEPPER_GLOBAL_OPTIONS } from '@angular/cdk/stepper';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatStepperModule } from '@angular/material/stepper';
import { UiRecipeFormPresenter } from './recipe-form.presenter';

@Component({
  selector: 'hoa-recipes-ui-recipe-edit-form',
  standalone: true,
  imports: [
    MatStepperModule,
    MatInputModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatIconModule,
  ],
  providers: [
    {
      provide: STEPPER_GLOBAL_OPTIONS,
      useValue: { showError: true },
    },
  ],
  templateUrl: './ui-recipe-edit-form.component.html',
  styleUrl: './ui-recipe-edit-form.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UiRecipeEditFormComponent {
  formService = inject(UiRecipeFormPresenter);

  addIngredient(): void {
    this.formService.addIngredientFormControl();
  }

  removeIngredient(index: number): void {
    this.formService.removeIngredientFormControl(index);
  }
}
