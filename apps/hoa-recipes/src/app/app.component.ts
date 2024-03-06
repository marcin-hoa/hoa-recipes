import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { RouterModule } from '@angular/router';
import { FeatureTitleBarComponent } from '@hoa-recipes/feature-title-bar';

@Component({
  standalone: true,
  imports: [RouterModule, FeatureTitleBarComponent],
  selector: 'hoa-recipes-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = 'hoa-recipes';

  constructor(public dialog: MatDialog) {}
}
