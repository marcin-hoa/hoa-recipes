import { CreateIngredientDto, IngredientDto } from './IngredientDto';

export type CreateRecipeDto = {
  name: string;
  preparationTimeInMinutes: number;
  description: string;
  ingredients: CreateIngredientDto[];
};

export type RecipeDto = CreateRecipeDto & {
  _id: string;
  ingredients: IngredientDto[];
};
