import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardSkill } from './dashboard-skill';

describe('DashboardSkill', () => {
  let component: DashboardSkill;
  let fixture: ComponentFixture<DashboardSkill>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DashboardSkill]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DashboardSkill);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
