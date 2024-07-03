import { TestBed } from '@angular/core/testing';

import { KeycloakadminService } from './keycloakadmin.service';

describe('KeycloakadminService', () => {
  let service: KeycloakadminService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(KeycloakadminService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
