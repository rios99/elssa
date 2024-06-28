import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CPreguntasComponent } from './c-preguntas.component';

describe('CPreguntasComponent', () => {
  let component: CPreguntasComponent;
  let fixture: ComponentFixture<CPreguntasComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CPreguntasComponent]
    });
    fixture = TestBed.createComponent(CPreguntasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
