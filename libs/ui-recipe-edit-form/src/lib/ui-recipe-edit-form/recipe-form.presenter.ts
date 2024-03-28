import { Injectable } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { RecipeDto } from '@hoa-recipes/data-access-recipes';

export type RecipeFormState = {
  recipeName: FormControl<string>;
  description: FormControl<string>;
  preparationTime: FormControl<number>;
  ingredients: FormArray<
    FormGroup<{
      ingredientName: FormControl<string>;
      ingredientQuantity: FormControl<string>;
    }>
  >;
  imageName: FormControl<string>;
};

@Injectable()
export class UiRecipeFormPresenter {
  private _recipeImage?: File = undefined;
  private _form = new FormGroup({
    recipeName: new FormControl<string>('', {
      validators: [Validators.required, Validators.maxLength(30)],
      nonNullable: true,
    }),
    description: new FormControl<string>('', {
      validators: [Validators.maxLength(150)],
      nonNullable: true,
    }),
    imageName: new FormControl<string>('', {
      nonNullable: true,
    }),
    preparationTime: new FormControl<number>(0, {
      validators: [Validators.required, Validators.min(1), Validators.max(180)],
      nonNullable: true,
    }),
    ingredients: new FormArray<
      FormGroup<{
        ingredientName: FormControl<string>;
        ingredientQuantity: FormControl<string>;
      }>
    >([this.createEmptyIngredientFormGroup()], {
      validators: [Validators.required, Validators.min(1)],
    }),
  });

  private createEmptyIngredientFormGroup(): FormGroup {
    return new FormGroup({
      ingredientName: new FormControl<string>('', {
        validators: [Validators.required, Validators.maxLength(30)],
        nonNullable: true,
      }),
      ingredientQuantity: new FormControl<string>('', {
        validators: [Validators.required, Validators.maxLength(30)],
        nonNullable: true,
      }),
    });
  }

  get recipeImage(): File | undefined {
    return this._recipeImage;
  }

  set recipeImage(value: File) {
    this._recipeImage = value;
  }

  get form(): FormGroup<RecipeFormState> {
    return this._form;
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

  get imageFormControl(): FormControl {
    return this._form.controls.imageName;
  }

  addIngredientFormControl(): void {
    this.ingredientsFormArray.push(this.createEmptyIngredientFormGroup());
  }

  removeIngredientFormControl(index: number): void {
    this.ingredientsFormArray.removeAt(index);
  }

  setInitialData(data: RecipeDto): void {
    this._form.patchValue(data);
    this.ingredientsFormArray.clear();

    data.ingredients.forEach((ing) => {
      const fg = this.createEmptyIngredientFormGroup();
      fg.patchValue(ing);
      this.ingredientsFormArray.push(fg);
    });
  }
}
