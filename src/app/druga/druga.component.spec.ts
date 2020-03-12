import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DrugaComponent } from './druga.component';

describe('DrugaComponent', () => {
  let component: DrugaComponent;
  let fixture: ComponentFixture<DrugaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DrugaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DrugaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
