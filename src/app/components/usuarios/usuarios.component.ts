import { FormControl } from '@angular/forms';
import { Usuario } from './../../model/usuario.model';
import { Component, OnInit } from '@angular/core';
import { USERS } from 'src/app/dados';
import { SharedService } from '../../services/shared.service';
import { UserService } from '../../services/user.service';
import { UsuarioDTO } from '../../model/usuarioDTO.model';
import { PerfilDTO } from '../../model/perfilDTO.model';
import { FuncionalidadeDTO } from '../../model/funcionalidadeDTO.model';
import { PerfilService } from '../../services/perfil-service';
import { Message } from 'primeng/api';
import { FilialDTO } from '../../model/filialDTO.model';
import { Tecnico } from '../../model/tecnico.model';

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.scss']
})
export class UsuariosComponent implements OnInit {

  nomeUsuario: FormControl = new FormControl('');
  usuario: Usuario;
  usuarioDTO: UsuarioDTO[] = [];
  shared: SharedService;
  usuarioCP: UsuarioDTO = new UsuarioDTO();
  usuarioInsert: UsuarioDTO = new UsuarioDTO();
  perfilDTO: Array<PerfilDTO> = new Array<PerfilDTO>();
  perfilSelectedDTO: Array<PerfilDTO> = new Array<PerfilDTO>();
  filiaisDTO: Array<FilialDTO> = new Array<FilialDTO>();
  filiaisSelectedDTO: Array<FilialDTO> = new Array<FilialDTO>();
  displayBasicFunc: boolean;
  msgs: Message[] = [];
  position: string;
  titulo: string;
  botao: string;
  metodo: number;
  idTecnico: number;



  constructor( public userver: UserService, public pes: PerfilService) {
    this.shared = SharedService.getInstance();
  }

  ngOnInit() {
    this.titulo = "Adicionar Novo Usuário";
    this.botao = "Inserir usuário";
    this.metodo = 1;
    this.usuarioDTO = [];
    this.idTecnico = null;
    this.usuarioInsert = {id: 0, usuario: "", dataFim: new Date("2999-01-01 00:00:00"), dataInicio: new Date, dataUltimoAcesso: new Date, filiais: [], nome: "", perfis: [], senha: "", tecnico: new Tecnico, alteraSenha: false};
    this.userver.usuarioTodos().subscribe( response => {
      this.usuarioDTO = this.usuarioDTO.concat(response['usuarioDTO']);
      //console.log(this.usuarioDTO);
    }, err => {
      //console.log(err);
      this.msgs = [{ severity: "error", summary: "Erro!", detail: "Erro ao buscar todos os usuários!" },];
    })
  }

  showDialogPerfil() {
    this.perfilDTO = new Array<PerfilDTO>();
    this.perfilSelectedDTO = new Array<PerfilDTO>();
    //console.log("Pesquisa Perfil");
    this.pes.perfilFiltro().subscribe( response => {
      this.perfilDTO = response['perfilDto'];
      this.filiaisDTO = response['filialDTO'];
      this.perfilSelectedDTO = this.usuarioCP.perfis;
      this.filiaisSelectedDTO = this.usuarioCP.filiais;
      //console.log(this.perfilDTO);
      //console.log(this.filiaisDTO);
      //console.log(this.perfilSelectedDTO);
      //console.log(this.filiaisSelectedDTO);
      this.displayBasicFunc = true;
    });

  }

  inserirUsuario() {
    if(this.metodo == 1) {
      //console.log("inserirUsuario");
      //console.log(this.usuarioInsert);
      this.usuarioInsert.tecnico.idTecnico = this.idTecnico;
      //console.log(this.usuarioInsert);
      this.userver.inserirUsuario(this.usuarioInsert).subscribe((response) => {
        //console.log(response);
        this.msgs = [
          { severity: "info", summary: "Confirmado", detail: "Usuário inserido com sucesso!" }
        ];
        this.usuarioInsert = new UsuarioDTO();
        this.ngOnInit();
      }, err => {
        //console.log(err);
        this.msgs = [{ severity: "error", summary: "Erro!", detail: "Erro ao inserir usuário!" },];
      })
    } else if (this.metodo == 2) {
      //console.log("alterarUsuario");
      //console.log(this.usuarioInsert);
      this.usuarioInsert.tecnico.idTecnico = this.idTecnico;
      this.userver.alterarUsuarioPerfil(this.usuarioInsert).subscribe((response) => {
        //console.log(response);
        this.msgs = [
          { severity: "info", summary: "Confirmado", detail: "Usuário alterado com sucesso!" }
        ];
        this.usuarioInsert = new UsuarioDTO();
        this.displayBasicFunc = false;
        this.ngOnInit();
      }, err => {
        //console.log(err);
        this.msgs = [{ severity: "error", summary: "Erro!", detail: "Erro ao alterar usuário!" },];
      })
    } else {
      this.msgs = [{ severity: "error", summary: "Erro!", detail: "Deu erro. Método não encontrado!" },];
      //console.log("Deu erro. Método não encontrado!");
    }

  }

  alterarUsuarioPerfil() {
    //console.log("alterarUsuarioPerfil");
    //console.log(this.usuarioCP);
    this.usuarioCP.perfis = this.perfilSelectedDTO;
    this.userver.alterarUsuarioPerfil(this.usuarioCP).subscribe((response) => {
      //console.log(response);
      this.msgs = [
        { severity: "info", summary: "Confirmado", detail: "Usuário alterado com sucesso!" }
      ];
      this.displayBasicFunc = false;
      this.ngOnInit();
    }, err => {
      //console.log(err);
      this.msgs = [{ severity: "error", summary: "Erro!", detail: "Erro ao alterar usuário!" },];
    })
  }

  alterarUsuario() {
    //console.log(this.usuarioCP);
    this.usuarioInsert = this.usuarioCP;
    this.idTecnico = this.usuarioCP.tecnico.idTecnico;
    this.titulo = "Editando Usuário";
    this.botao = "Salvar usuário";
    this.metodo = 2;
    //console.log(this.metodo);
  }

  resetarSenha() {
    //console.log("resetarSenha");
    //this.usuarioCP.perfis = this.perfilSelectedDTO;
    this.userver.resetarSenha(this.usuarioCP.usuario).subscribe((response) => {
      //console.log(response);
      this.msgs = [
        { severity: "info", summary: "Confirmado", detail: "Senha resetada com sucesso!" }
      ];
      this.displayBasicFunc = false;
      this.ngOnInit();
    }, err => {
      //console.log(err);
      this.msgs = [{ severity: "error", summary: "Erro!", detail: "Erro ao resetar senha!" },];
    })
  }

  validar() {
    //console.log(this.usuarioInsert.usuario)
    //console.log(this.idTecnico)

    if (parseInt(this.usuarioInsert.usuario) != this.idTecnico) {
        alert('Número do Técnico CRM precisa ser igual em ambos os campos!');
        this.usuarioInsert.usuario = "";
        this.idTecnico = null;
        return false; //Parar a execucao
    }
    return true;
 }
}
