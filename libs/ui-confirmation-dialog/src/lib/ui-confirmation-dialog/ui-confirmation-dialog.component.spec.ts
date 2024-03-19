import { ComponentFixture, TestBed } from '@angular/core/testing';
import { UiConfirmationDialogComponent } from './ui-confirmation-dialog.component';

describe('UiConfirmationDialogComponent', () => {
  let component: UiConfirmationDialogComponent;
  let fixture: ComponentFixture<UiConfirmationDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UiConfirmationDialogComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(UiConfirmationDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
