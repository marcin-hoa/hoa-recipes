import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FeatureRecipeListComponent } from '@hoa-recipes/feature-recipe-list';
import { UiTitleBarComponent } from '@hoa-recipes/ui-title-bar';

@Component({
  standalone: true,
  imports: [RouterModule, UiTitleBarComponent, FeatureRecipeListComponent],
  selector: 'hoa-recipes-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent {
  title = 'hoa-recipes';
}
