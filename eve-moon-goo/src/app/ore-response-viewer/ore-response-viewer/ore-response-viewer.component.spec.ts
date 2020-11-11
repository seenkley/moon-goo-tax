import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OreResponseViewerComponent } from './ore-response-viewer.component';

describe('OreResponseViewerComponent', () => {
  let component: OreResponseViewerComponent;
  let fixture: ComponentFixture<OreResponseViewerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OreResponseViewerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OreResponseViewerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
