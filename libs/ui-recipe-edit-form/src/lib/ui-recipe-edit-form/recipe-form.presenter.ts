import { Injectable } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';

export type RecipeFormState = {
  recipeName: string;
  description?: string;
  preparationTime: number;
  ingredients: {
    ingredientName: string;
    ingredientQuantity: string;
  }[];
};

@Injectable()
export class UiRecipeFormPresenter {
  private _form = new FormGroup({
    recipeName: new FormControl<string>('', {
      validators: [Validators.required, Validators.maxLength(30)],
    }),
    description: new FormControl<string>('', {
      validators: [Validators.maxLength(150)],
    }),
    preparationTime: new FormControl<number>(0, {
      validators: [Validators.required, Validators.min(1), Validators.max(180)],
    }),
    ingredients: new FormArray<FormGroup>(
      [this.createEmptyIngredientFormGroup()],
      {
        validators: [Validators.required, Validators.min(1)],
      },
    ),
  });

  private createEmptyIngredientFormGroup(): FormGroup {
    return new FormGroup({
      ingredientName: new FormControl<string>('', {
        validators: [Validators.required, Validators.maxLength(30)],
      }),
      ingredientQuantity: new FormControl<string>('', {
        validators: [Validators.required, Validators.maxLength(30)],
      }),
    });
  }

  get form(): FormGroup {
    return this._form;
  }

  //TODO: remove it
  constructor() {
    this._form.valueChanges.subscribe((v) => {
      console.log(this._form.valid);
    });
  }

  get recipeNameControl(): FormControl {
    return this._form.controls.recipeName;
  }

  get recipeDescriptionControl(): FormControl {
    return this._form.controls.description;
  }

  get recipePreparationTimeControl(): FormControl {
    return this._form.controls.preparationTime;
  }

  get ingredientsFormArray(): FormArray<FormGroup> {
    return this._form.controls.ingredients;
  }

  addIngredientFormControl(): void {
    this.ingredientsFormArray.push(this.createEmptyIngredientFormGroup());
  }

  removeIngredientFormControl(index: number): void {
    this.ingredientsFormArray.removeAt(index);
  }
}
