import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FinalizaOrientacionComponent } from './finaliza-orientacion.component';

describe('FinalizaOrientacionComponent', () => {
  let component: FinalizaOrientacionComponent;
  let fixture: ComponentFixture<FinalizaOrientacionComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FinalizaOrientacionComponent]
    });
    fixture = TestBed.createComponent(FinalizaOrientacionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
