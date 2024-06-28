import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CRespuestasPreguntaComponent } from './c-respuestas-pregunta.component';

describe('CRespuestasPreguntaComponent', () => {
  let component: CRespuestasPreguntaComponent;
  let fixture: ComponentFixture<CRespuestasPreguntaComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CRespuestasPreguntaComponent]
    });
    fixture = TestBed.createComponent(CRespuestasPreguntaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
