import { TestBed } from '@angular/core/testing';

import { ServicioFiltroPersonaService } from './servicio-filtro-persona.service';

describe('ServicioFiltroPersonaService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ServicioFiltroPersonaService = TestBed.get(ServicioFiltroPersonaService);
    expect(service).toBeTruthy();
  });
});
