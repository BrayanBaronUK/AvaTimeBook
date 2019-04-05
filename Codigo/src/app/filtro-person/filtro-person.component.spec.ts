import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FiltroPersonComponent } from './filtro-person.component';

describe('FiltroPersonComponent', () => {
  let component: FiltroPersonComponent;
  let fixture: ComponentFixture<FiltroPersonComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FiltroPersonComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FiltroPersonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
