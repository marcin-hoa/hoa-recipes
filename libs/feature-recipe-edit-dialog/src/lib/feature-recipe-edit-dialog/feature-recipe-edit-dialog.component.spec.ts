import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FeatureRecipeEditDialogComponent } from './feature-recipe-edit-dialog.component';

describe('FeatureRecipeEditDialogComponent', () => {
  let component: FeatureRecipeEditDialogComponent;
  let fixture: ComponentFixture<FeatureRecipeEditDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FeatureRecipeEditDialogComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(FeatureRecipeEditDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
