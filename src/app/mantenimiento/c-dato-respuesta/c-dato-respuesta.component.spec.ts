import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CDatoRespuestaComponent } from './c-dato-respuesta.component';

describe('CDatoRespuestaComponent', () => {
  let component: CDatoRespuestaComponent;
  let fixture: ComponentFixture<CDatoRespuestaComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CDatoRespuestaComponent]
    });
    fixture = TestBed.createComponent(CDatoRespuestaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
