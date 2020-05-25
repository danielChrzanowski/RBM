import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RestauramtMenuComponent } from './restauramt-menu.component';

describe('RestauramtMenuComponent', () => {
  let component: RestauramtMenuComponent;
  let fixture: ComponentFixture<RestauramtMenuComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RestauramtMenuComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RestauramtMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
