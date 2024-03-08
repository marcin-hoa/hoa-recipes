import { JsonPipe } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  OnInit,
  inject,
} from '@angular/core';
import { MatIcon } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { RouterModule, RouterOutlet } from '@angular/router';
import {
  RecipesApiActions,
  RecipesUiActions,
  selectAllRecipes,
  setSelectedRecipeId,
} from '@hoa-recipes/data-access-recipes';
import { Store } from '@ngrx/store';

@Component({
  selector: 'hoa-recipes-feature-recipe-list',
  standalone: true,
  imports: [MatListModule, MatIcon, JsonPipe, RouterOutlet, RouterModule],
  providers: [Store],
  templateUrl: './feature-recipe-list.component.html',
  styleUrl: './feature-recipe-list.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FeatureRecipeListComponent implements OnInit {
  private store = inject(Store);

  recipes = this.store.selectSignal(selectAllRecipes);
  selectedRecipe = this.store.selectSignal(setSelectedRecipeId);

  ngOnInit(): void {
    this.store.dispatch(RecipesApiActions.load());
  }

  selectRecipe(recipeId: string): void {
    this.store.dispatch(RecipesUiActions.selectRecipe({ recipeId: recipeId }));
  }
}
