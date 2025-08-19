import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FooterFront } from './footer-front';

describe('FooterFront', () => {
  let component: FooterFront;
  let fixture: ComponentFixture<FooterFront>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FooterFront]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FooterFront);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
