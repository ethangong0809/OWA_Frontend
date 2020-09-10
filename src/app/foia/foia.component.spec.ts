import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FoiaComponent } from './foia.component';

describe('FoiaFirstComponent', () => {
  let component: FoiaComponent;
  let fixture: ComponentFixture<FoiaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FoiaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FoiaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
