import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FeatureTitleBarComponent } from './feature-title-bar.component';

describe('FeatureTitleBarComponent', () => {
  let component: FeatureTitleBarComponent;
  let fixture: ComponentFixture<FeatureTitleBarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FeatureTitleBarComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(FeatureTitleBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
