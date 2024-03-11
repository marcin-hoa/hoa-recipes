import { ComponentFixture, TestBed } from '@angular/core/testing';
import { UiRecipesPreparationTimeComponent } from './ui-recipes-preparation-time.component';

describe('UiRecipesPreparationTimeComponent', () => {
  let component: UiRecipesPreparationTimeComponent;
  let fixture: ComponentFixture<UiRecipesPreparationTimeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UiRecipesPreparationTimeComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(UiRecipesPreparationTimeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
