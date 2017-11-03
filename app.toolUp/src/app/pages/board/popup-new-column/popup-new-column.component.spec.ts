import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PopupNewColumnComponent } from './popup-new-column.component';

describe('PopupNewColumnComponent', () => {
  let component: PopupNewColumnComponent;
  let fixture: ComponentFixture<PopupNewColumnComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PopupNewColumnComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PopupNewColumnComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
