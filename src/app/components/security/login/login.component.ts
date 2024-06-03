import { LoginServiceService } from './../../../services/login-service.service';
import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/model/user.model';
import { Router } from '@angular/router';
import { Perfil } from '../../../model/perfil.model';
import { AuthService } from '../../../services/auth.service';
import { StorageService } from '../../../services/storage.service';
import { PerfilService } from '../../../services/perfil-service';
import { SharedService } from '../../../services/shared.service';
import { Visualizacao } from '../../../services/servicoVisualizacao';
import { UsuarioDTO } from '../../../model/usuarioDTO.model';
import { UserService } from '../../../services/user.service';
import { PerfilDTO } from '../../../model/perfilDTO.model';
import { Header } from 'primeng/api';
import { HeaderComponent } from '../../header/header.component';
import { DataSharingService } from '../../../services/data-sharing.service';
import { StatusDTO } from '../../../model/statusDTO.model';
import { FiltrosDTO } from "../../../model/filtrosDTO.model";
import { ServicoPedido } from "../../../services/servico-pedido";
import { Message } from 'primeng/api';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  user: User;
  shared: SharedService;
  usuario: string;
  senha: string;
  visible = true;
  message: string;
  perfil: Perfil[] = [];
  response: any;
  usuarioDTO: UsuarioDTO = null;
  statusDTO: StatusDTO[] = [];
  k: number;
  filtros: FiltrosDTO = new FiltrosDTO();
  msgs: Message[] = [];


  constructor(

    public router: Router,
    public loginValidation: LoginServiceService,
    public auth: AuthService,
    public storage: StorageService,
    public pes: PerfilService,  public userver: UserService, private dataSharingService: DataSharingService) {
     this.shared = SharedService.getInstance();
 }

  ngOnInit() {
    this.user = new User('', '', '');
    this.k = 0;
  }

  login() {
    sessionStorage.clear();
    //console.log(sessionStorage.getItem('btAdm'));
    //console.log(sessionStorage.getItem('btFiltro'));
    this.user.usuario = this.usuario;
    this.user.senha = this.senha;
    this.auth.authenticate(this.user).subscribe(res => {
      sessionStorage.setItem('Authorization', res.headers.get('Authorization'));
      this.auth.successfulLogin(sessionStorage.getItem('Authorization'));
      let localUser = this.storage.getLocalUser();

      this.userver.usuario(this.user.usuario).subscribe( response => {
        this.usuarioDTO = response['usuario'];
        let dataAtual: Date = new Date();
        let dataBanco = new Date(this.usuarioDTO.dataFim);
        //console.log(dataBanco)
        //console.log(this.usuarioDTO.dataFim)
        //console.log(dataAtual.getTime())
        //console.log(dataBanco.getTime)
        //console.log(dataAtual.getTime() < dataBanco.getTime())
        if(dataAtual.getTime() < dataBanco.getTime()) {
          //console.log(this.usuarioDTO);

          this.shared.usuarioDTO = this.usuarioDTO;

          //console.log(sessionStorage['Authorization']);
          for (let i of this.usuarioDTO.perfis) {
            for (let j of i.funcionalidades) {
              sessionStorage.setItem(j.funcionalidade, j.funcionalidade);
              //console.log(j.pagina);
              if(j.pagina == 'Status' && this.k < 15 ){
                this.statusDTO.push({idStatus:j.id, status:j.funcionalidade});
                //console.log(j.funcionalidade);
                this.k++;
              }
            }
          }

          this.filtros.filialDTO = this.usuarioDTO.filiais;
          this.filtros.statusDTO = this.statusDTO;
          //console.log(this.filtros);
          ServicoPedido.setDados(this.filtros);

          this.shared.showTemplate.emit(true);
          Visualizacao.setVisualiza(true);
          this.dataSharingService.filialDTO.next(this.usuarioDTO.filiais);
          this.dataSharingService.statusDTO.next(this.statusDTO);
          this.dataSharingService.isUserLoggedIn.next(true);
          this.router.navigate(['app-home']);
        } else {
          this.msgs = [{ severity: "error", summary: "Erro!", detail: "Você não tem permissão para acessar o sistema!" },];
        }
      }, err => {
      //console.log(err);
      this.msgs = [{ severity: "error", summary: "Erro!", detail: "Erro ao buscar usuário!" },];
      })

    }, err => {
      //console.log(err);
      this.msgs = [{ severity: "error", summary: "Erro!", detail: "Usuário ou senha inválidos!" },];
    })
  }

  cancelLogin() {
    this.message = '';
    this.user = new User('', '', '');
    window.location.href = '/login';
    window.location.reload();
  }
}
