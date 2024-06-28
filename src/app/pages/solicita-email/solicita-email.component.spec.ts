import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SolicitaEmailComponent } from './solicita-email.component';

describe('SolicitaEmailComponent', () => {
  let component: SolicitaEmailComponent;
  let fixture: ComponentFixture<SolicitaEmailComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SolicitaEmailComponent]
    });
    fixture = TestBed.createComponent(SolicitaEmailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
