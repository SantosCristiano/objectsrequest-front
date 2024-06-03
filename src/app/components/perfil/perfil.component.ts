
import { Component, OnInit } from '@angular/core';
import { SharedService } from '../../services/shared.service';
import { PerfilService } from '../../services/perfil-service';
import { PerfilDTO } from '../../model/perfilDTO.model';
import { FuncionalidadeDTO } from '../../model/funcionalidadeDTO.model';
import { Message } from 'primeng/api';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.scss']
})
export class PerfilComponent implements OnInit {
  perfilDTO: PerfilDTO[] = [];
  shared: SharedService;
  perfilCP: PerfilDTO = new PerfilDTO();
  perfilInsert: PerfilDTO = new PerfilDTO();
  msgs: Message[] = [];
  position: string;


  funcionalidadeDTO: Array<FuncionalidadeDTO> = new Array<FuncionalidadeDTO>();
  funcionalidadeSelectedDTO: Array<FuncionalidadeDTO> = new Array<FuncionalidadeDTO>();
  displayBasicFunc: boolean;

  constructor( public pes: PerfilService) {
    this.shared = SharedService.getInstance();
}

  ngOnInit() {
    this.perfilDTO = [];
    this.perfilCP = new PerfilDTO();
    this.perfilInsert = new PerfilDTO();

    this.pes.perfilFiltro().subscribe( response => {
    this.perfilDTO = this.perfilDTO.concat(response['perfilDto']);
    //console.log(this.perfilDTO);
  });

}


showDialogFuncionalidades() {
  //console.log("Pesquisa Peças");
  this.pes.perfilFuncionalidade().subscribe( response => {
  this.funcionalidadeDTO = this.funcionalidadeDTO.concat(response['funcionalidadeDto']);
   this.funcionalidadeSelectedDTO = this.perfilCP.funcionalidades;
    //console.log(this.perfilDTO);
    this.displayBasicFunc = true;
  });
}

inserirPerfil() {
  //console.log("inserirPerfil");
  this.pes.inserirPerfil(this.perfilInsert).subscribe((response) => {
    //console.log(response);
    this.msgs = [
      { severity: "info", summary: "Confirmado", detail: "Perfil Inserido" }
    ];
    this.ngOnInit();
  });
}

alterarPerfilFuncionalidades() {
  //console.log("alterarPerfilFuncionalidades");
  this.perfilCP.funcionalidades = this.funcionalidadeSelectedDTO;
  this.pes.alterarPerfilFuncionalidade(this.perfilCP).subscribe((response) => {
    //console.log(response);
    this.msgs = [
      { severity: "info", summary: "Confirmado", detail: "Perfil Alterado" }
    ];
    this.displayBasicFunc = false;
    this.ngOnInit();
  });
}


}
