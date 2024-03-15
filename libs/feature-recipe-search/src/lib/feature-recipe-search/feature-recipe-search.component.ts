import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  HostListener,
  ViewChild,
} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'hoa-recipes-feature-recipe-search',
  standalone: true,
  imports: [MatFormFieldModule, FormsModule, MatInputModule],
  templateUrl: './feature-recipe-search.component.html',
  styleUrl: './feature-recipe-search.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FeatureRecipeSearchComponent {
  @ViewChild('searchInput') searchInput!: ElementRef<HTMLInputElement>;

  @HostListener('window:keydown', ['$event'])
  onKeyDownAltM(e: KeyboardEvent) {
    if (e.ctrlKey && e.key === 'k') {
      e.preventDefault();
      this.searchInput.nativeElement.focus();
    }
  }
}
