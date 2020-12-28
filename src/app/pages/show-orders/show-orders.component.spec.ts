import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { ShowUsersComponent } from './show-orders.component';

describe('ShowUsersComponent', () => {
  let component: ShowUsersComponent;
  let fixture: ComponentFixture<ShowUsersComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ ShowUsersComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShowUsersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
