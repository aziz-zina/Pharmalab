import { TestBed } from '@angular/core/testing';

import { MedicineServiceService } from './medicine-service.service';

describe('MedicineServiceService', () => {
  let service: MedicineServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MedicineServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
