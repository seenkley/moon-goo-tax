import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MiningServiceComponent } from './mining-service.component';

describe('MiningServiceComponent', () => {
  let component: MiningServiceComponent;
  let fixture: ComponentFixture<MiningServiceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MiningServiceComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MiningServiceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
