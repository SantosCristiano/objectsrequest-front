import { User } from './../model/user.model';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class LoginServiceService {
  token = '';
  constructor(private http: HttpClient) {}

  logar(usuarioLogin: User) {

    const login = {
      usuario: usuarioLogin.usuario,
      senha: usuarioLogin.senha,
    };
    return this.http.post('', login, { observe: 'response' });
  }
  perfil(header: HttpHeaders) {
    //console.log('vai chamar perfil get com ');
    //console.log(header);

    return this.http.get('', {headers: header,  observe: 'body' });
  }


}
