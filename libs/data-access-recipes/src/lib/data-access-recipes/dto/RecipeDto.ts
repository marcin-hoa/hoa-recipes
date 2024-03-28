import { IngredientDto } from './IngredientDto';

export type CreateRecipeDto = {
  recipeName: string;
  preparationTime: number;
  description: string;
  ingredients: IngredientDto[];
  imageName: string;
};

export type RecipeDto = CreateRecipeDto & {
  id: string;
};
