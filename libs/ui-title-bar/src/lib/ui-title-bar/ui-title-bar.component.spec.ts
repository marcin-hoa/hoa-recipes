import { ComponentFixture, TestBed } from '@angular/core/testing';
import { UiTitleBarComponent } from './ui-title-bar.component';

describe('UiTitleBarComponent', () => {
  let component: UiTitleBarComponent;
  let fixture: ComponentFixture<UiTitleBarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UiTitleBarComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(UiTitleBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
