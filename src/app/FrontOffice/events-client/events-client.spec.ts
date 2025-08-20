import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EventsClient } from './events-client';

describe('EventsClient', () => {
  let component: EventsClient;
  let fixture: ComponentFixture<EventsClient>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [EventsClient]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EventsClient);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
