import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClientWorkspaceComponent } from './client-workspace.component';

describe('ClientWorkspaceComponent', () => {
  let component: ClientWorkspaceComponent;
  let fixture: ComponentFixture<ClientWorkspaceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ClientWorkspaceComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ClientWorkspaceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
