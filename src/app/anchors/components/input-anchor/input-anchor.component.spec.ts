import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InputAnchorComponent } from './input-anchor.component';

describe('InputAnchorComponent', () => {
  let component: InputAnchorComponent;
  let fixture: ComponentFixture<InputAnchorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InputAnchorComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InputAnchorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
