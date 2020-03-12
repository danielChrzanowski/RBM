import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PierwszaComponent } from './pierwsza.component';

describe('PierwszaComponent', () => {
  let component: PierwszaComponent;
  let fixture: ComponentFixture<PierwszaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PierwszaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PierwszaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
