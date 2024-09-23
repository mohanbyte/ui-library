import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IoFormFieldComponent } from './io-form-field.component';

describe('IoFormFieldComponent', () => {
  let component: IoFormFieldComponent;
  let fixture: ComponentFixture<IoFormFieldComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ IoFormFieldComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(IoFormFieldComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
