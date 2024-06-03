import { API_CONFIG } from '../../environments/environment';
import { User } from 'src/app/model/user.model';
import { HttpClient } from '@angular/common/http';
import { StorageService } from './storage.service';
import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable()
export class AuthService {

    jwtHelper: JwtHelperService = new JwtHelperService();

    constructor(
        public http: HttpClient,
        public storage: StorageService
        ) {}

    authenticate(usuarioLogin: User) {
      const login = {
        usuario: usuarioLogin.usuario,
        senha: usuarioLogin.senha,
      };
      return this.http.post(`${API_CONFIG.baseUrl}/login`, login, { observe: 'response', responseType: 'text' });
    }

    refreshToken() {
        return this.http.post(
            `${API_CONFIG.baseUrl}/auth/refresh_token`,
            {},
            {
                observe: 'response',
                responseType: 'text'
            });
    }

    successfulLogin(authorizationValue: string) {
      //console.log('successfulLogin:  ' + authorizationValue);

      const tok = authorizationValue.substring(7);
      const sen = authorizationValue.substring(7);
      const user: User = {
            token: tok,
            senha: sen,
            usuario: this.jwtHelper.decodeToken(tok).sub        };
      this.storage.setLocalUser(user);
    }

    logout() {
        this.storage.setLocalUser(null);
    }
}
