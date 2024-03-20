import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';

export type ConfirmationDialogComponentData = {
  isDeleteConfirmation: boolean;
  header?: string;
  text?: string;
};

@Component({
  selector: 'hoa-recipes-ui-confirmation-dialog',
  standalone: true,
  imports: [MatDialogModule, MatButtonModule],
  templateUrl: './ui-confirmation-dialog.component.html',
  styleUrl: './ui-confirmation-dialog.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UiConfirmationDialogComponent {
  dialogData: ConfirmationDialogComponentData = inject(MAT_DIALOG_DATA);
}
