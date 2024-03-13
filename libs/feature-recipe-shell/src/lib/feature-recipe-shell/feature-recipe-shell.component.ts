import { ChangeDetectionStrategy, Component } from '@angular/core';
import { MatSidenavModule } from '@angular/material/sidenav';
import { RouterModule } from '@angular/router';
import { FeatureRecipeListComponent } from '@hoa-recipes/feature-recipe-list';
import { UiTitleBarComponent } from '@hoa-recipes/ui-title-bar';

@Component({
  selector: 'hoa-recipes-feature-recipe-shell',
  standalone: true,
  imports: [
    MatSidenavModule,
    UiTitleBarComponent,
    FeatureRecipeListComponent,
    RouterModule,
  ],
  templateUrl: './feature-recipe-shell.component.html',
  styleUrl: './feature-recipe-shell.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FeatureRecipeShellComponent {}
