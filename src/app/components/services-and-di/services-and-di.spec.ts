import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ServicesAndDI } from './services-and-di';

describe('ServicesAndDI', () => {
  let component: ServicesAndDI;
  let fixture: ComponentFixture<ServicesAndDI>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ServicesAndDI]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ServicesAndDI);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
