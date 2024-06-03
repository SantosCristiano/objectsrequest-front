import { UsuarioDTO } from './../model/usuarioDTO.model';
import { User } from './../model/user.model';
import { Injectable, EventEmitter } from '@angular/core';


@Injectable({
  providedIn: 'root'
})
export class SharedService {

public static instance: SharedService = null;
usuarioDTO: UsuarioDTO = new UsuarioDTO;
user: User;
token: string;
showTemplate = new EventEmitter<boolean>();

  constructor() {
return SharedService.instance = SharedService.instance || this;

   }

   public static getInstance() {
     if (this.instance == null) {
       this.instance = new SharedService();
     }
     return this.instance;
   }

   isLoggedIn(): boolean {
     if (this.user == null) {
       return false;
     }
     return this.user.usuario !== '';
   }
}
