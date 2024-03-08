import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog } from '@angular/material/dialog';
import { MatIcon } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { UiAuthorDialogComponent } from '@hoa-recipes/ui-author-dialog';
import { take } from 'rxjs';

@Component({
  selector: 'hoa-recipes-ui-title-bar',
  standalone: true,
  imports: [MatButtonModule, MatToolbarModule, MatIcon],
  templateUrl: './ui-title-bar.component.html',
  styleUrl: './ui-title-bar.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UiTitleBarComponent {
  private dialog = inject(MatDialog);

  openDialog(): void {
    const dialogRef = this.dialog.open(UiAuthorDialogComponent);

    dialogRef
      .afterClosed()
      .pipe(take(1))
      .subscribe(() => {
        console.log('The dialog was closed');
      });
  }
}
