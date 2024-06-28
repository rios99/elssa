import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DefaultWrapperComponent } from './default-wrapper.component';

describe('DefaultWrapperComponent', () => {
  let component: DefaultWrapperComponent;
  let fixture: ComponentFixture<DefaultWrapperComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DefaultWrapperComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DefaultWrapperComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
