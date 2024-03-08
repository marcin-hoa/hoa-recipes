import { ChangeDetectionStrategy, Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import {
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogTitle,
} from '@angular/material/dialog';

@Component({
  selector: 'hoa-recipes-ui-author-dialog',
  standalone: true,
  imports: [
    MatButtonModule,
    MatDialogTitle,
    MatDialogContent,
    MatDialogActions,
    MatDialogClose,
  ],
  templateUrl: './ui-author-dialog.component.html',
  styleUrl: './ui-author-dialog.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UiAuthorDialogComponent {}
