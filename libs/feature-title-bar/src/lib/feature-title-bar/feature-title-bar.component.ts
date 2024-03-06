import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog } from '@angular/material/dialog';
import { MatIcon } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { UiAuthorDialogComponent } from '@hoa-recipes/ui-author-dialog';

@Component({
  selector: 'hoa-recipes-feature-title-bar',
  standalone: true,
  imports: [CommonModule, MatButtonModule, MatToolbarModule, MatIcon],
  templateUrl: './feature-title-bar.component.html',
  styleUrl: './feature-title-bar.component.scss',
})
export class FeatureTitleBarComponent {
  constructor(private dialog: MatDialog) {}

  openDialog(): void {
    const dialogRef = this.dialog.open(UiAuthorDialogComponent);

    dialogRef.afterClosed().subscribe(() => {
      console.log('The dialog was closed');
    });
  }
}
