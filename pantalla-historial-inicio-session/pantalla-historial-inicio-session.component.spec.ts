import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PantallaHistorialInicioSessionComponent } from './pantalla-historial-inicio-session.component';

describe('PantallaHistorialInicioSessionComponent', () => {
  let component: PantallaHistorialInicioSessionComponent;
  let fixture: ComponentFixture<PantallaHistorialInicioSessionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PantallaHistorialInicioSessionComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PantallaHistorialInicioSessionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
