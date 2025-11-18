import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardContact } from './dashboard-contact';

describe('DashboardContact', () => {
  let component: DashboardContact;
  let fixture: ComponentFixture<DashboardContact>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DashboardContact]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DashboardContact);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
