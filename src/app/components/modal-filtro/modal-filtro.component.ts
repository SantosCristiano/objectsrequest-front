import { ServicoPedido } from './../../services/servico-pedido';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-modal-filtro',
  templateUrl: './modal-filtro.component.html',
  styleUrls: ['./modal-filtro.component.sass']
})
export class ModalFiltroComponent implements OnInit {
  filtros: Array<boolean> = new Array<boolean>();
  local: boolean;
  residente: boolean;
  constructor() { }
  enviarFiltrosParaHome() {
    if (this.filtros.length === 0) {
      //console.log('length 0');
      this.filtros.push(this.local);
      this.filtros.push(this.residente);
      //console.log(this.filtros);
    } else {
      if (this.filtros.length === 2) {
        while (this.filtros.length > 0) {
          this.filtros.splice(this.filtros.length - 1);
        }
        //console.log('chegou no else');
        this.filtros.push(this.local);
        this.filtros.push(this.residente);
        //console.log(this.filtros.length);
        //console.log(this.filtros);

      }
    }


  }
  ngOnInit() {
  }

}
