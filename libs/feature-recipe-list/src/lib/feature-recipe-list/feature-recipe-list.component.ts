import { JsonPipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { MatIcon } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { RouterModule, RouterOutlet } from '@angular/router';
import { selectAllRecipes } from '@hoa-recipes/data-access-recipes';
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
export class FeatureRecipeListComponent {
  private store = inject(Store);

  recipes = this.store.selectSignal(selectAllRecipes);
}
