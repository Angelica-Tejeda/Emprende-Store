import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetallesProfileComponent } from './detalles-profile.component';

describe('DetallesProfileComponent', () => {
  let component: DetallesProfileComponent;
  let fixture: ComponentFixture<DetallesProfileComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DetallesProfileComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DetallesProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
