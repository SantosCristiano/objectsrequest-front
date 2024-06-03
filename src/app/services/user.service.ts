import { API_CONFIG } from '../../environments/environment';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from '../model/user.model';
import {PARTS_REQUEST_API} from './partsrequest.api';
import { UsuarioDTO } from '../model/usuarioDTO.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }

  login(user: User) {
    return this.http.get(`${PARTS_REQUEST_API}/usuarios/login/ribeirf2,123456`);
  }


findAll(page: number, count: number) {
  return this.http.get(`${PARTS_REQUEST_API}/api/user/${page}/${count}`);
}

usuarioTodos() {
  return this.http.get(`${API_CONFIG.baseUrl}/usuarios/todos`);
}


usuario(usuario: string ) {
  return this.http.post(`${API_CONFIG.baseUrl}/usuarios/usuario`, usuario);

}


inserirUsuario(uDTO: UsuarioDTO) {
  return this.http.post(`${API_CONFIG.baseUrl}/usuarios/insert`, uDTO, {
    observe: "response",
    responseType: "text",
  });
}

removeUsuario(uDTO: UsuarioDTO) {
  return this.http.post(`${API_CONFIG.baseUrl}/usuarios/remove`, uDTO, {
    observe: "response",
    responseType: "text",
  });
}

alterarUsuarioPerfil(uDTO: UsuarioDTO) {
  return this.http.post(`${API_CONFIG.baseUrl}/usuarios/update`, uDTO, {
    observe: "response",
    responseType: "text",
  });
}

resetarSenha(usuario: string ) {
  return this.http.post(`${API_CONFIG.baseUrl}/usuarios/resetarSenha`, usuario);

}

alterarSenha(uDTO: UsuarioDTO) {
  return this.http.post(`${API_CONFIG.baseUrl}/usuarios/alterarSenha`, uDTO);

}
}
