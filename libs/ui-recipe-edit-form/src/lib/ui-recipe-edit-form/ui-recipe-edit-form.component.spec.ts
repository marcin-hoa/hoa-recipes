import { ComponentFixture, TestBed } from '@angular/core/testing';
import { UiRecipeEditFormComponent } from './ui-recipe-edit-form.component';

describe('UiRecipeEditFormComponent', () => {
  let component: UiRecipeEditFormComponent;
  let fixture: ComponentFixture<UiRecipeEditFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UiRecipeEditFormComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(UiRecipeEditFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
