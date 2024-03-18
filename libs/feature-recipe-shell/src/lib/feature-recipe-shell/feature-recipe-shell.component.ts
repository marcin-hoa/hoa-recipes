import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSidenavModule } from '@angular/material/sidenav';
import { RouterModule } from '@angular/router';
import { FeatureRecipeEditDialogComponent } from '@hoa-recipes/feature-recipe-edit-dialog';
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
    MatInputModule,
    MatFormFieldModule,
    FormsModule,
    MatIconModule,
    MatButtonModule,
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
