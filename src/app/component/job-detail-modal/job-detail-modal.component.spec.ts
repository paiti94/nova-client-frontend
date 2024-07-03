import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JobDetailModalComponent } from './job-detail-modal.component';

describe('JobDetailModalComponent', () => {
  let component: JobDetailModalComponent;
  let fixture: ComponentFixture<JobDetailModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [JobDetailModalComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(JobDetailModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
