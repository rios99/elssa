import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WhiteFullHeightWrapperComponent } from './white-full-height-wrapper.component';

describe('WhiteFullHeightWrapperComponent', () => {
  let component: WhiteFullHeightWrapperComponent;
  let fixture: ComponentFixture<WhiteFullHeightWrapperComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WhiteFullHeightWrapperComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WhiteFullHeightWrapperComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
