import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HeaderFront } from './header-front';

describe('HeaderFront', () => {
  let component: HeaderFront;
  let fixture: ComponentFixture<HeaderFront>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HeaderFront]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HeaderFront);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
