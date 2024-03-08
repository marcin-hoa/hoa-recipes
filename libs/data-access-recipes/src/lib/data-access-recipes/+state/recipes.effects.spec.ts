import { TestBed } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { Action } from '@ngrx/store';
import { provideMockStore } from '@ngrx/store/testing';
import { hot } from 'jasmine-marbles';
import { Observable } from 'rxjs';

import * as RecipesActions from './recipes.actions';
import { RecipesEffects } from './recipes.effects';

describe('RecipesEffects', () => {
  let actions: Observable<Action>;
  let effects: RecipesEffects;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [],
      providers: [
        RecipesEffects,
        provideMockActions(() => actions),
        provideMockStore(),
      ],
    });

    effects = TestBed.inject(RecipesEffects);
  });

  describe('init$', () => {
    it('should work', () => {
      actions = hot('-a-|', { a: RecipesActions.initRecipes() });

      const expected = hot('-a-|', {
        a: RecipesActions.loadRecipesSuccess({ recipes: [] }),
      });

      expect(effects.init$).toBeObservable(expected);
    });
  });
});
