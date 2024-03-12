import { Injectable } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';

@Injectable()
export class FeatureRecipeFormService {
  private recipeFormGroup = new FormGroup({
    recipeName: new FormControl<string>('', {
      validators: [Validators.required, Validators.maxLength(30)],
    }),
    description: new FormControl<string>('', [Validators.maxLength(150)]),
    preparationTime: new FormControl<number>(0, {
      validators: [Validators.required, Validators.min(1), Validators.max(180)],
    }),
    ingredients: new FormArray<FormGroup>(
      [this.getEmptyIngredientFormGroup()],
      {
        validators: [Validators.required, Validators.min(1)],
      },
    ),
  });

  get form(): FormGroup {
    return this.recipeFormGroup;
  }

  //TODO: remove it
  constructor() {
    this.recipeFormGroup.valueChanges.subscribe((v) => {
      console.log(this.recipeFormGroup.valid);
    });
  }

  get recipeNameControl(): FormControl {
    return this.recipeFormGroup.controls.recipeName;
  }

  get recipeDescriptionControl(): FormControl {
    return this.recipeFormGroup.controls.description;
  }

  get recipePreparationTimeControl(): FormControl {
    return this.recipeFormGroup.controls.preparationTime;
  }

  get ingredientsFormArray(): FormArray<FormGroup> {
    return this.recipeFormGroup.controls.ingredients;
  }

  addIngredientFormControl(): void {
    this.ingredientsFormArray.push(this.getEmptyIngredientFormGroup());
  }

  private getEmptyIngredientFormGroup(): FormGroup {
    return new FormGroup({
      ingredientName: new FormControl<string>('', {
        validators: [Validators.required, Validators.maxLength(30)],
      }),
      ingredientQuantity: new FormControl<string>('', {
        validators: [Validators.required, Validators.maxLength(30)],
      }),
    });
  }
}
