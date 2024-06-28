import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CPreguntaPorRespuestaComponent } from './c-pregunta-por-respuesta.component';

describe('CPreguntaPorRespuestaComponent', () => {
  let component: CPreguntaPorRespuestaComponent;
  let fixture: ComponentFixture<CPreguntaPorRespuestaComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CPreguntaPorRespuestaComponent]
    });
    fixture = TestBed.createComponent(CPreguntaPorRespuestaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
