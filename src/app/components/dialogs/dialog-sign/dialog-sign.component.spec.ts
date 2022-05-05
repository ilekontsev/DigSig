import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogSignComponent } from './dialog-sign.component';

describe('DialogSignComponent', () => {
  let component: DialogSignComponent;
  let fixture: ComponentFixture<DialogSignComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DialogSignComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogSignComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
