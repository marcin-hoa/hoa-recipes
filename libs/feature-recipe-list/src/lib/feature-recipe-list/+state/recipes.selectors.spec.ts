import { RecipesEntity } from './recipes.models';
import {
  recipesAdapter,
  RecipesPartialState,
  initialRecipesState,
} from './recipes.reducer';
import * as RecipesSelectors from './recipes.selectors';

describe('Recipes Selectors', () => {
  const ERROR_MSG = 'No Error Available';
  const getRecipesId = (it: RecipesEntity) => it.id;
  const createRecipesEntity = (id: string, name = '') =>
    ({
      id,
      name: name || `name-${id}`,
    }) as RecipesEntity;

  let state: RecipesPartialState;

  beforeEach(() => {
    state = {
      recipes: recipesAdapter.setAll(
        [
          createRecipesEntity('PRODUCT-AAA'),
          createRecipesEntity('PRODUCT-BBB'),
          createRecipesEntity('PRODUCT-CCC'),
        ],
        {
          ...initialRecipesState,
          selectedId: 'PRODUCT-BBB',
          error: ERROR_MSG,
          loaded: true,
        },
      ),
    };
  });

  describe('Recipes Selectors', () => {
    it('selectAllRecipes() should return the list of Recipes', () => {
      const results = RecipesSelectors.selectAllRecipes(state);
      const selId = getRecipesId(results[1]);

      expect(results.length).toBe(3);
      expect(selId).toBe('PRODUCT-BBB');
    });

    it('selectEntity() should return the selected Entity', () => {
      const result = RecipesSelectors.selectEntity(state) as RecipesEntity;
      const selId = getRecipesId(result);

      expect(selId).toBe('PRODUCT-BBB');
    });

    it('selectRecipesLoaded() should return the current "loaded" status', () => {
      const result = RecipesSelectors.selectRecipesLoaded(state);

      expect(result).toBe(true);
    });

    it('selectRecipesError() should return the current "error" state', () => {
      const result = RecipesSelectors.selectRecipesError(state);

      expect(result).toBe(ERROR_MSG);
    });
  });
});
