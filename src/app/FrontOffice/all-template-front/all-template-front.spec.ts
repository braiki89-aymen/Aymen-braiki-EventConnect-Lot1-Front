import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AllTemplateFront } from './all-template-front';

describe('AllTemplateFront', () => {
  let component: AllTemplateFront;
  let fixture: ComponentFixture<AllTemplateFront>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AllTemplateFront]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AllTemplateFront);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
