import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateDemandeRealisationComponent } from './update-demande-realisation.component';

describe('UpdateDemandeRealisationComponent', () => {
  let component: UpdateDemandeRealisationComponent;
  let fixture: ComponentFixture<UpdateDemandeRealisationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UpdateDemandeRealisationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdateDemandeRealisationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
