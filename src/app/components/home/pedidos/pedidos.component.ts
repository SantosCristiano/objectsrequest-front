import { Pedido } from './../../../model/pedido.model';
import { Component, OnInit, Input } from '@angular/core';
import { ServicoPedido } from '../../../services/servico-pedido';
import { PedidoDTO } from '../../../model/pedidoDTO.model';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { PedidoService } from '../../../services/pedido-service';

@Component({
  selector: 'app-pedidos',
  templateUrl: './pedidos.component.html',
  styleUrls: ['./pedidos.component.scss'],
})
export class PedidosComponent implements OnInit {
  @Input()
  pedidos: PedidoDTO;
  testeClick = false;
  responsiveOptions;


  constructor(private http: HttpClient, private router: Router, public peds: PedidoService) {
    this.responsiveOptions = [
      {
        breakpoint: "1024px",
        numVisible: 10,
        numScroll: 10,
      },
      {
        breakpoint: "768px",
        numVisible: 7,
        numScroll: 7,
      },
      {
        breakpoint: "560px",
        numVisible: 1,
        numScroll: 1,
      },
    ];
    }

  @Input()
  i: number;

  @Input()
  filter: Array<boolean> = new Array<boolean>();
  cor = '';
  isActive = false;
  isOtherActive = false;

   ngOnInit() {}

  pegaInformacao() {
   //console.log(this.pedidos);

  }

  mudaStatus(ped: PedidoDTO) {

      //console.log(ped);
      this.peds.alteraPedido(ped).subscribe(response => {
      //console.log(response);
      });
   }

  aguardSep() {
    if (
      this.pedidos.stPstatusStatus  === 'AGUARD. SEPARAÇÃO' ||
      this.pedidos.stPstatusStatus  === 'SEPARANDO'
    ) {
      return true;
    } else {
      return false;
    }
  }

  notaFiscal() {
    if (
      this.pedidos.stPstatusStatus  === 'AGUARD. NOTA FISCAL' ||
      this.pedidos.stPstatusStatus  === 'EMITINDO NOTA FISCAL'
    ) {
      return true;
    } else {
      return false;
    }
  }

  previsao() {
    if (
      this.pedidos.stPstatusStatus  === 'AGUARD. PREVISÃO' ||
      this.pedidos.stPstatusStatus  === 'PREVISÃO'
    ) {
      return true;
    } else {
      return false;
    }
  }

  transporte() {
    if (
      this.pedidos.stPstatusStatus  === 'EM TRANSPORTE'
    ) {
      return true;
    } else {
      return false;
    }
  }

  finalizado() {
    if (
      this.pedidos.stPstatusStatus  === 'FINALIZADO'
    ) {
      return true;
    } else {
      return false;
    }
  }

  enviado() {
    if (this.pedidos.stPstatusStatus  === 'ENVIADO') {
      return true;
    } else {
      return false;
    }
  }

  verifDispEReceb() {
    if (
      this.pedidos.stPstatusStatus  ===
        'VERIF. DISPONIBILIDADE' ||
        this.pedidos.stPstatusStatus  === 'RECEBIDO'
    ) {
      return true;
    } else {
      return false;
    }
  }
}
