import { CommonModule } from '@angular/common';
import { Component, OnInit, Signal, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {
  RecipesEntity,
  getSelectedRecipe,
} from '@hoa-recipes/data-access-recipes';
import { Store } from '@ngrx/store';

@Component({
  selector: 'hoa-recipes-feature-recipe-details',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './feature-recipe-details.component.html',
  styleUrl: './feature-recipe-details.component.scss',
})
export class FeatureRecipeDetailsComponent implements OnInit {
  private store = inject(Store);
  private route = inject(ActivatedRoute);

  recipe!: Signal<RecipesEntity | undefined>;

  ngOnInit(): void {
    // this.route.params.subscribe((r) => {
    //   console.log(r);
    // });

    this.store.subscribe((s) => {
      const recipeId: string = s.recipes.recipeId;
      console.log(recipeId);
      this.recipe = this.store.selectSignal(getSelectedRecipe);
    });
  }

  // selectSignal(getSelectedRecipe);
}
