import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JitaPriceViewComponent } from './jita-price-view.component';

describe('JitaPriceViewComponent', () => {
  let component: JitaPriceViewComponent;
  let fixture: ComponentFixture<JitaPriceViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ JitaPriceViewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(JitaPriceViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
