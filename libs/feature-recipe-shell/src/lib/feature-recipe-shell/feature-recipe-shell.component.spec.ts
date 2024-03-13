import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FeatureRecipeShellComponent } from './feature-recipe-shell.component';

describe('FeatureRecipeShellComponent', () => {
  let component: FeatureRecipeShellComponent;
  let fixture: ComponentFixture<FeatureRecipeShellComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FeatureRecipeShellComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(FeatureRecipeShellComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
