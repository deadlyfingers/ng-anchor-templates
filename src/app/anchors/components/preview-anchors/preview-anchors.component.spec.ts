import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PreviewAnchorsComponent } from './preview-anchors.component';

describe('AnchorTextComponent', () => {
  let component: PreviewAnchorsComponent;
  let fixture: ComponentFixture<PreviewAnchorsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PreviewAnchorsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PreviewAnchorsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
