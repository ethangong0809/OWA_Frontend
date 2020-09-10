import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ElectedOfficialComponent } from './elected-official.component';

describe('ElectedOfficialComponent', () => {
  let component: ElectedOfficialComponent;
  let fixture: ComponentFixture<ElectedOfficialComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ElectedOfficialComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ElectedOfficialComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
