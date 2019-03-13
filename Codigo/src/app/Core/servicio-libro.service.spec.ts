import { TestBed } from '@angular/core/testing';

import { ServicioLibroService } from './servicio-libro.service';

describe('ServicioLibroService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ServicioLibroService = TestBed.get(ServicioLibroService);
    expect(service).toBeTruthy();
  });
});
