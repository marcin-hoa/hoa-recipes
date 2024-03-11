import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FeatureRecipeShellComponent } from '@hoa-recipes/feature-recipe-shell';

@Component({
  standalone: true,
  imports: [FeatureRecipeShellComponent],
  selector: 'hoa-recipes-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent {
  title = 'hoa-recipes';
}
