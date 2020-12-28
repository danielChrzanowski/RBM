import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { ClientMakeOrderComponent } from './client-make-order.component';

describe('ClientMakeOrderComponent', () => {
  let component: ClientMakeOrderComponent;
  let fixture: ComponentFixture<ClientMakeOrderComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ ClientMakeOrderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ClientMakeOrderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
