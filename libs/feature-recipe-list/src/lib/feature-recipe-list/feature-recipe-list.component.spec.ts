import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FeatureRecipeListComponent } from './feature-recipe-list.component';

describe('FeatureRecipeListComponent', () => {
  let component: FeatureRecipeListComponent;
  let fixture: ComponentFixture<FeatureRecipeListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FeatureRecipeListComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(FeatureRecipeListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
