import { TestBed } from '@angular/core/testing';

import { ServicioComentarioService } from './servicio-comentario.service';

describe('ServicioComentarioService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ServicioComentarioService = TestBed.get(ServicioComentarioService);
    expect(service).toBeTruthy();
  });
});
