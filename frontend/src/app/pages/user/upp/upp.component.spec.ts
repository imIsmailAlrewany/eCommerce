import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UppComponent } from './upp.component';

describe('UppComponent', () => {
  let component: UppComponent;
  let fixture: ComponentFixture<UppComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UppComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UppComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
