import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PresetDateTimePickerComponent } from './preset-date-time-picker.component';

describe('PresetDateTimePickerComponent', () => {
  let component: PresetDateTimePickerComponent;
  let fixture: ComponentFixture<PresetDateTimePickerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PresetDateTimePickerComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PresetDateTimePickerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
