import { CreateIngredientDto, IngredientDto } from './IngredientDto';

export type CreateRecipeDto = {
  recipeName: string;
  preparationTime: number;
  description: string;
  ingredients: CreateIngredientDto[];
};

export type RecipeDto = CreateRecipeDto & {
  id: string;
  ingredients: IngredientDto[];
};
