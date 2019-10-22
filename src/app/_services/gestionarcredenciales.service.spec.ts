import { TestBed } from '@angular/core/testing';

import { GestionarcredencialesService } from './gestionarcredenciales.service';

describe('GestionarcredencialesService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: GestionarcredencialesService = TestBed.get(GestionarcredencialesService);
    expect(service).toBeTruthy();
  });
});