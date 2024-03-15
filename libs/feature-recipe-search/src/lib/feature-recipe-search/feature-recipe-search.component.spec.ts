import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FeatureRecipeSearchComponent } from './feature-recipe-search.component';

describe('FeatureRecipeSearchComponent', () => {
  let component: FeatureRecipeSearchComponent;
  let fixture: ComponentFixture<FeatureRecipeSearchComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FeatureRecipeSearchComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(FeatureRecipeSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
