import {
  ChangeDetectionStrategy,
  Component,
  OnInit,
  inject,
  signal,
} from '@angular/core';
import { MatIcon } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { RecipeDto, RecipesRepository } from '@hoa-recipes/data-access-api';

@Component({
  selector: 'hoa-recipes-feature-recipe-list',
  standalone: true,
  imports: [MatListModule, MatIcon],
  providers: [RecipesRepository],
  templateUrl: './feature-recipe-list.component.html',
  styleUrl: './feature-recipe-list.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FeatureRecipeListComponent implements OnInit {
  protected recipes = signal<RecipeDto[]>([]);

  private recipeRepository = inject(RecipesRepository);

  ngOnInit(): void {
    this.recipeRepository.getAll().subscribe((res) => {
      this.recipes.set(res);
    });
  }
}
