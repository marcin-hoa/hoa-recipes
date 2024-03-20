import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  HostListener,
  ViewChild,
  inject,
} from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { RecipesUiActions } from '@hoa-recipes/data-access-recipes';
import { Store } from '@ngrx/store';
import { debounceTime } from 'rxjs';

@Component({
  selector: 'hoa-recipes-feature-recipe-search',
  standalone: true,
  imports: [
    MatFormFieldModule,
    FormsModule,
    MatInputModule,
    ReactiveFormsModule,
  ],
  templateUrl: './feature-recipe-search.component.html',
  styleUrl: './feature-recipe-search.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FeatureRecipeSearchComponent {
  private store = inject(Store);

  @ViewChild('searchInput') searchInput!: ElementRef<HTMLInputElement>;

  formControl = new FormControl('');

  @HostListener('window:keydown', ['$event'])
  onKeyDownAltM(e: KeyboardEvent) {
    if (e.ctrlKey && e.key === 'k') {
      e.preventDefault();
      this.searchInput.nativeElement.focus();
    }
  }

  constructor() {
    this.formControl.valueChanges
      .pipe(debounceTime(200), takeUntilDestroyed())
      .subscribe((val) => {
        this.store.dispatch(
          RecipesUiActions.setSearchPhrase({ searchPhrase: val || '' }),
        );
      });
  }
}
