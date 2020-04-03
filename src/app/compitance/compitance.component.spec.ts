import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CompitanceComponent } from './compitance.component';

describe('CompitanceComponent', () => {
  let component: CompitanceComponent;
  let fixture: ComponentFixture<CompitanceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CompitanceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CompitanceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
