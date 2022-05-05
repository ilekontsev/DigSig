import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogCheckComponent } from './dialog-check.component';

describe('DialogCheckComponent', () => {
  let component: DialogCheckComponent;
  let fixture: ComponentFixture<DialogCheckComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DialogCheckComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogCheckComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
