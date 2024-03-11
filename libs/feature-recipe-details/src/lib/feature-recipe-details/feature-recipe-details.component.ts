import { Component, inject } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { MatCardModule } from '@angular/material/card';
import { MatListModule } from '@angular/material/list';
import { ActivatedRoute, RouterModule } from '@angular/router';
import {
  RecipesUiActions,
  getSelectedRecipe,
} from '@hoa-recipes/data-access-recipes';
import { UiRecipesPreparationTimeComponent } from '@hoa-recipes/ui-recipes-preparation-time';
import { Store } from '@ngrx/store';
import { distinctUntilChanged } from 'rxjs';

@Component({
  selector: 'hoa-recipes-feature-recipe-details',
  standalone: true,
  imports: [
    RouterModule,
    MatCardModule,
    UiRecipesPreparationTimeComponent,
    MatListModule,
  ],
  templateUrl: './feature-recipe-details.component.html',
  styleUrl: './feature-recipe-details.component.scss',
})
export class FeatureRecipeDetailsComponent {
  private store = inject(Store);
  private route = inject(ActivatedRoute);

  recipe = this.store.selectSignal(getSelectedRecipe);

  constructor() {
    this.route.paramMap
      .pipe(distinctUntilChanged(), takeUntilDestroyed())
      .subscribe((r) => {
        const recipeId = r.get('id');
        this.store.dispatch(
          RecipesUiActions.selectRecipe({ selectedId: recipeId as string }),
        );
      });
  }
}
