import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PopupNewTaskComponent } from './popup-new-task.component';

describe('PopupNewTaskComponent', () => {
  let component: PopupNewTaskComponent;
  let fixture: ComponentFixture<PopupNewTaskComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PopupNewTaskComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PopupNewTaskComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
