import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSidenavModule } from '@angular/material/sidenav';
import { RouterModule } from '@angular/router';
import { FeatureRecipeEditDialogComponent } from '@hoa-recipes/feature-recipe-edit-dialog';
import { FeatureRecipeListComponent } from '@hoa-recipes/feature-recipe-list';
import { FeatureRecipeSearchComponent } from '@hoa-recipes/feature-recipe-search';
import { UiTitleBarComponent } from '@hoa-recipes/ui-title-bar';

@Component({
  selector: 'hoa-recipes-feature-recipe-shell',
  standalone: true,
  imports: [
    MatSidenavModule,
    UiTitleBarComponent,
    FeatureRecipeListComponent,
    RouterModule,
    MatInputModule,
    MatIconModule,
    MatButtonModule,
    FeatureRecipeSearchComponent,
  ],
  templateUrl: './feature-recipe-shell.component.html',
  styleUrl: './feature-recipe-shell.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FeatureRecipeShellComponent {
  private dialog = inject(MatDialog);

  openCreateRecipeDialog(): void {
    this.dialog.open(FeatureRecipeEditDialogComponent);
  }
}
