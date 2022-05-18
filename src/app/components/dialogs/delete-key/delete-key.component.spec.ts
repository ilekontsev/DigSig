import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteKeyComponent } from './delete-key.component';

describe('DeleteKeyComponent', () => {
  let component: DeleteKeyComponent;
  let fixture: ComponentFixture<DeleteKeyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DeleteKeyComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DeleteKeyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
