import { TestBed } from '@angular/core/testing';

import { WarningAlertService } from './warning-alert.service';

describe('WarningAlertService', () => {
  let service: WarningAlertService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(WarningAlertService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
