export type CreateIngredientDto = {
  name: string;
  quantity: string;
};

export type IngredientDto = CreateIngredientDto & {
  _id: string;
};
