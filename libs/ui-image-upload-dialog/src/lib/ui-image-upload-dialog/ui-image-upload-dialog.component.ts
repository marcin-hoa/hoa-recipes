import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  inject,
  signal,
  ViewChild,
} from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { RecipeDto, RecipesUiActions } from '@hoa-recipes/data-access-recipes';
import { Store } from '@ngrx/store';

@Component({
  selector: 'hoa-recipes-ui-image-upload-dialog',
  standalone: true,
  imports: [MatDialogModule, MatButtonModule, MatIconModule],
  templateUrl: './ui-image-upload-dialog.component.html',
  styleUrl: './ui-image-upload-dialog.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UiImageUploadDialogComponent {
  private store = inject(Store);
  dialogData: RecipeDto = inject(MAT_DIALOG_DATA);

  @ViewChild('fileInput') fileInputRef!: ElementRef<HTMLInputElement>;
  uploadButtonDisabled = signal<boolean>(true);

  uploadImage(): void {
    if (!this.fileInputRef.nativeElement.files) {
      return;
    }
    this.store.dispatch(
      RecipesUiActions.uploadRecipeImage({
        image: this.fileInputRef.nativeElement.files[0],
        recipe: this.dialogData,
      }),
    );
  }

  deleteImage(): void {
    if (!this.dialogData.imageName) {
      return;
    }

    this.store.dispatch(
      RecipesUiActions.deleteRecipeImage({
        fileName: this.dialogData.imageName,
      }),
    );
  }

  updateUploadButtonStatus(): void {
    const isFileSet = !!this.fileInputRef.nativeElement.files?.length || false;
    this.uploadButtonDisabled.set(!isFileSet);
  }
}
