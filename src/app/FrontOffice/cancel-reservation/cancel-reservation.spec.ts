import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CancelReservation } from './cancel-reservation';

describe('CancelReservation', () => {
  let component: CancelReservation;
  let fixture: ComponentFixture<CancelReservation>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CancelReservation]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CancelReservation);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
