import { Filial } from './../../model/filial.model';
import { Component, OnInit } from '@angular/core';
import { SharedService } from '../../services/shared.service';
import { FilialService } from '../../services/filial.service';
import { Message } from 'primeng/api';
import { FilialDTO } from '../../model/filialDTO.model';

@Component({
  selector: 'app-filiais',
  templateUrl: './filiais.component.html',
  styleUrls: ['./filiais.component.scss']
})
export class FiliaisComponent implements OnInit {

  filial: Filial;
  filialDTO: FilialDTO[] = [];
  shared: SharedService;
  filialCP: FilialDTO = new FilialDTO();
  filialInsert: FilialDTO = new FilialDTO();
  msgs: Message[] = [];
  position: string;
  titulo: string;
  botao: string;
  metodo: number;

  constructor( public fserver: FilialService) {
    this.shared = SharedService.getInstance();
  }

  ngOnInit() {
    this.titulo = "Adicionar Novo Estoque";
    this.botao = "Inserir Estoque";
    this.metodo = 1;
    this.filialDTO = [];
    this.fserver.filialTodos().subscribe( response => {
      this.filialDTO = this.filialDTO.concat(response['filialDTO']);
      //console.log(this.filialDTO);
    });
  }

  inserirEstoque() {
    if(this.metodo == 1){
      //console.log("inserirEstoque");
      //console.log(this.filialInsert);
      this.fserver.inserirEstoque(this.filialInsert).subscribe((response) => {
        //console.log(response);
        this.msgs = [
          { severity: "info", summary: "Confirmado", detail: "Estoque Inserido" }
        ];
        this.filialInsert = new FilialDTO();
        this.ngOnInit();
      });
    } else if (this.metodo == 2) {
      //console.log("alterarEstoque");
      //console.log(this.filialInsert);
      this.fserver.alterarEstoque(this.filialInsert).subscribe((response) => {
        //console.log(response);
        this.msgs = [
          { severity: "info", summary: "Confirmado", detail: "Estoque Alterado" }
        ];
        this.filialInsert = new FilialDTO();
        this.ngOnInit();
      });
    } else {
      //console.log("Deu erro. Método não encontrado!");
    }

  }

  alterarEstoque() {
    //console.log(this.filialCP);
    this.filialInsert = this.filialCP;
    this.titulo = "Editando Estoque";
    this.botao = "Salvar Estoque";
    this.metodo = 2;
    //console.log(this.metodo);
  }

}
