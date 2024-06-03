import { TipoPedido } from './../../model/tipoPedido.model';
import { TIPODEPEDIDO } from './../../dados';
import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-tipo-pedidos',
  templateUrl: './tipo-pedidos.component.html',
  styleUrls: ['./tipo-pedidos.component.scss']
})
export class TipoPedidosComponent implements OnInit {

  tiposDePedidos: Array<TipoPedido> = TIPODEPEDIDO;
  nomeTipo: FormControl = new FormControl('');
  tipoElemento: TipoPedido;
  constructor() { }

  ngOnInit() {
  }

  incluir() {
    if (this.nomeTipo.value !== '') {
      this.tipoElemento = new TipoPedido();
      this.tipoElemento.id = this.tiposDePedidos.length + 1;
      this.tipoElemento.tipoPedido = this.nomeTipo.value.toUpperCase();
      this.tiposDePedidos.push(this.tipoElemento);
      //console.log(this.tiposDePedidos);
      this.nomeTipo = new FormControl('');
    } else {
      alert('Preencha o tipo de pedido');
    }
  }

  remover(index: number) {
    this.tiposDePedidos.splice(index, 1);
    //console.log(this.tiposDePedidos);
  }

}
