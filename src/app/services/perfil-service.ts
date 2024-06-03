import { API_CONFIG } from '../../environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Perfil } from '../model/perfil.model';
import { PerfilDTO } from '../model/perfilDTO.model';

@Injectable()
export class PerfilService {
  token = '';
  constructor(
    public http: HttpClient,
    ) {}

  perfilTodos() {
    return this.http.get(`${API_CONFIG.baseUrl}/perfil/usuario`);
  }

  perfilFiltro() {
    return this.http.get(`${API_CONFIG.baseUrl}/perfil/filtro`);
  }

  perfilFuncionalidade() {
    return this.http.get(`${API_CONFIG.baseUrl}/perfil/funcionalidade`);
  }



  inserirPerfil(pDTO: PerfilDTO) {
    return this.http.post(`${API_CONFIG.baseUrl}/perfil/insert`, pDTO, {
      observe: "response",
      responseType: "text",
    });
  }

  alterarPerfilFuncionalidade(pDTO: PerfilDTO) {
    return this.http.post(`${API_CONFIG.baseUrl}/perfil/alterarPerfilFuncionalidade`, pDTO, {
      observe: "response",
      responseType: "text",
    });
  }


}
