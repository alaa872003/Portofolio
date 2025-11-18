import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardProject } from './dashboard-project';

describe('DashboardProject', () => {
  let component: DashboardProject;
  let fixture: ComponentFixture<DashboardProject>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DashboardProject]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DashboardProject);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
