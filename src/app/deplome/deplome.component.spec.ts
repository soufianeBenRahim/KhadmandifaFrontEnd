import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DeplomeComponent } from './deplome.component';

describe('DeplomeComponent', () => {
  let component: DeplomeComponent;
  let fixture: ComponentFixture<DeplomeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DeplomeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DeplomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
