import { Injectable, inject } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Observable, take } from 'rxjs';
import {
  ConfirmationDialogComponentData,
  UiConfirmationDialogComponent,
} from './ui-confirmation-dialog.component';

@Injectable()
export class UiConfirmationDialogService {
  private dialog = inject(MatDialog);

  open(data: ConfirmationDialogComponentData): Observable<boolean | undefined> {
    return this.dialog
      .open<
        UiConfirmationDialogComponent,
        ConfirmationDialogComponentData,
        boolean
      >(UiConfirmationDialogComponent, {
        data: {
          header: data.header || 'Are you sure?',
          text:
            data.text ||
            'This will delete all elements that are currently on this page and cannot be undone.',
          isDeleteConfirmation: data.isDeleteConfirmation,
        },
      })
      .afterClosed()
      .pipe(take(1));
  }
}
