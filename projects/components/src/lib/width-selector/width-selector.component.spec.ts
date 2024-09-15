import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WidthSelectorComponent } from './width-selector.component';

describe('WidthSelectorComponent', () => {
  let component: WidthSelectorComponent;
  let fixture: ComponentFixture<WidthSelectorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WidthSelectorComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WidthSelectorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
