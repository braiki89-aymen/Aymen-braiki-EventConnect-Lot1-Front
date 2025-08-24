import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListParticipant } from './list-participant';

describe('ListParticipant', () => {
  let component: ListParticipant;
  let fixture: ComponentFixture<ListParticipant>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ListParticipant]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListParticipant);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
