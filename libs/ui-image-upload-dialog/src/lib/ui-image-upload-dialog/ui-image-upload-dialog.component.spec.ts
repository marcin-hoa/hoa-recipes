import { ComponentFixture, TestBed } from '@angular/core/testing';
import { UiImageUploadDialogComponent } from './ui-image-upload-dialog.component';

describe('UiImageUploadDialogComponent', () => {
  let component: UiImageUploadDialogComponent;
  let fixture: ComponentFixture<UiImageUploadDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UiImageUploadDialogComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(UiImageUploadDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
