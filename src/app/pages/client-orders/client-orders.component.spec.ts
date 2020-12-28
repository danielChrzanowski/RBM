import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { ClientOrdersComponent } from './client-orders.component';

describe('ClientOrdersComponent', () => {
  let component: ClientOrdersComponent;
  let fixture: ComponentFixture<ClientOrdersComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ ClientOrdersComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ClientOrdersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
