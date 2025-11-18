import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardFooter } from './dashboard-footer';

describe('DashboardFooter', () => {
  let component: DashboardFooter;
  let fixture: ComponentFixture<DashboardFooter>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DashboardFooter]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DashboardFooter);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
