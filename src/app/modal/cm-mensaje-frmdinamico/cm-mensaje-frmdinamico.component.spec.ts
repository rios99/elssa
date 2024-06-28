import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CmMensajeFrmdinamicoComponent } from './cm-mensaje-frmdinamico.component';

describe('CmMensajeFrmdinamicoComponent', () => {
  let component: CmMensajeFrmdinamicoComponent;
  let fixture: ComponentFixture<CmMensajeFrmdinamicoComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CmMensajeFrmdinamicoComponent]
    });
    fixture = TestBed.createComponent(CmMensajeFrmdinamicoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
