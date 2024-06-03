import { FormControl } from '@angular/forms';
import { ModalidadeEntrega } from './../../model/modalidadeEntrega.model';

import { MODALIDADES } from './../../dados';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-modalidade-entrega',
  templateUrl: './modalidade-entrega.component.html',
  styleUrls: ['./modalidade-entrega.component.scss']
})
export class ModalidadeEntregaComponent implements OnInit {
  modalidadesEntrega: Array<ModalidadeEntrega> = MODALIDADES;
  modalidadesInput: ModalidadeEntrega;
  nomeModalidade = new FormControl('');

  constructor() {}

  ngOnInit() {}

  incluir() {
    if (this.nomeModalidade.value !== '') {
      this.modalidadesInput = new ModalidadeEntrega();
      this.modalidadesInput.id = this.modalidadesEntrega.length + 1;
      this.modalidadesInput.modalidade = this.nomeModalidade.value.toUpperCase();

      this.modalidadesEntrega.push(this.modalidadesInput);
      //console.log(this.modalidadesEntrega);
      this.nomeModalidade = new FormControl('');
    } else {
      alert('Preencha o nome da modalidade');
    }
  }
  remover(index: number) {
    this.modalidadesEntrega.splice(index, 1);
    //console.log(this.modalidadesEntrega);
  }
}
