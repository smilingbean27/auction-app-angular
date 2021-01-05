import { TestBed } from '@angular/core/testing';

import { AdminDataService } from './admin-data.service';

describe('UserDataService', () => {
  let service: AdminDataService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AdminDataService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
