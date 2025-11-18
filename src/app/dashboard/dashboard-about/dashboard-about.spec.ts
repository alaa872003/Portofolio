import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardAbout } from './dashboard-about';

describe('DashboardAbout', () => {
  let component: DashboardAbout;
  let fixture: ComponentFixture<DashboardAbout>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DashboardAbout]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DashboardAbout);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
