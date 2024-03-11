import { Component, computed, input } from '@angular/core';
import { MatIcon } from '@angular/material/icon';

@Component({
  selector: 'hoa-recipes-ui-recipes-preparation-time',
  standalone: true,
  imports: [MatIcon],
  templateUrl: './ui-recipes-preparation-time.component.html',
  styleUrl: './ui-recipes-preparation-time.component.scss',
})
export class UiRecipesPreparationTimeComponent {
  preparationTime = input<number>();
  formatted = input<boolean>(false);

  displayPreparationTime = computed<string>(() => {
    return this.formatted()
      ? this.formatTime(this.preparationTime())
      : `${this.preparationTime()} min.`;
  });

  private formatTime(preparationTime: number | undefined): string {
    if (!preparationTime) return '-';

    const hours = Math.floor(preparationTime / 60)
      .toString()
      .padStart(2, '0');
    const minutes = (preparationTime % 60).toString().padStart(2, '0');

    return `${hours}:${minutes} h`;
  }
}
