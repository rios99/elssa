import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CmMensajeHomeComponent } from './cm-mensaje-home.component';

describe('CmMensajeHomeComponent', () => {
  let component: CmMensajeHomeComponent;
  let fixture: ComponentFixture<CmMensajeHomeComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CmMensajeHomeComponent]
    });
    fixture = TestBed.createComponent(CmMensajeHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
