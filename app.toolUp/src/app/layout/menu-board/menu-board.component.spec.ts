import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MenuBoardComponent } from './menu-board.component';

describe('MenuBoardComponent', () => {
  let component: MenuBoardComponent;
  let fixture: ComponentFixture<MenuBoardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MenuBoardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MenuBoardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
