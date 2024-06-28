import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CDatoPregPorRespComponent } from './c-dato-preg-por-resp.component';

describe('CDatoPregPorRespComponent', () => {
  let component: CDatoPregPorRespComponent;
  let fixture: ComponentFixture<CDatoPregPorRespComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CDatoPregPorRespComponent]
    });
    fixture = TestBed.createComponent(CDatoPregPorRespComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
