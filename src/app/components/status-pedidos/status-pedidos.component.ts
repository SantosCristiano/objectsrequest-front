import { Status } from './../../model/status.model';
import { STATUS } from './../../dados';
import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-status-pedidos',
  templateUrl: './status-pedidos.component.html',
  styleUrls: ['./status-pedidos.component.scss']
})
export class StatusPedidosComponent implements OnInit {
  status: Array<Status> = STATUS;
  nomeStatus: FormControl = new FormControl('');
  elementoStatus: Status;
  constructor() {}

  ngOnInit() {}

  incluir() {
    if (this.nomeStatus.value !== '') {
      this.elementoStatus = new Status();
      this.elementoStatus.id = status.length + 1;
      this.elementoStatus.status = this.nomeStatus.value. toUpperCase();
      this.status.push(this.elementoStatus);
      //console.log(this.status);
      this.nomeStatus = new FormControl('');
    } else {
      alert('Preencha o nome do status');
    }
  }
  remover(index: number) {
    this.status.splice(index, 1);
    //console.log(this.status);
  }
}
