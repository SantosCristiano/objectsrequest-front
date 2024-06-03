import { PedidoService } from './../../../services/pedido-service';
import { PedidoDTO } from './../../../model/pedidoDTO.model';
import { PedidoProdutosDTO } from './../../../model/pedidoProdutosDTO.model';
import { Localizacao } from './../../../model/localizacao.model';
import { STATUS, LOCALIZA, TIPODEPEDIDO } from './../../../dados';
import { Status } from './../../../model/status.model';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { TipoPedido } from 'src/app/model/tipoPedido.model';

@Component({
  selector: 'app-cadastro-pedidos',
  templateUrl: './cadastro-pedidos.component.html',
  styleUrls: ['./cadastro-pedidos.component.sass']
})
export class CadastroPedidosComponent implements OnInit {
  cadastroPeca: FormGroup;
  statusDePedidos: Array<Status> = STATUS;
  localResidente: Array<Localizacao> = LOCALIZA;
  tipoPedido: Array<TipoPedido> = TIPODEPEDIDO;
  pedidoProdutosLista: Array<PedidoProdutosDTO> = new Array<PedidoProdutosDTO>();
  constructor(private pedidoServico: PedidoService) {
    this.cadastroPeca = new FormGroup({
      stPstatusData: new FormControl(),
      stPstatusUsuario: new FormControl(),
      stPstatusStatus: new FormControl(),
      nomeLocalizacao: new FormControl(),
      tipoPedido: new FormControl(),
      idTarefa: new FormControl(),
      idSite: new FormControl(),
      produto: new FormControl(),
      qtdProduto: new FormControl(),
      idTecnico: new FormControl(),
      eaLogradouro: new FormControl(),
      eaCep: new FormControl(),
      eaBairro: new FormControl(),
      eaCidade: new FormControl(),
      eaNum: new FormControl()
    });
  }

  ngOnInit() {

  }
  adicionarProdutoLista() {
    const pedidoProdutos: PedidoProdutosDTO = new PedidoProdutosDTO();
    pedidoProdutos.prodCodigo = this.cadastroPeca.get('produto').value;
    pedidoProdutos.prodQtd = this.cadastroPeca.get('qtdProduto').value;
    this.pedidoProdutosLista.push(pedidoProdutos);

  }

  cadastrar() {
    const pedidoDTO = new PedidoDTO();
    pedidoDTO.stPstatusData = this.cadastroPeca.get('stPstatusData').value;
    pedidoDTO.stPstatusUsuario = this.cadastroPeca.get('stPstatusUsuario').value;
    pedidoDTO.stPstatusStatus = this.cadastroPeca.get('stPstatusStatus').value;
    pedidoDTO.nomeLocalizacao = this.cadastroPeca.get('nomeLocalizacao').value;
    pedidoDTO.tipoPedido = this.cadastroPeca.get('tipoPedido').value;
    pedidoDTO.idTarefa = this.cadastroPeca.get('idTarefa').value;
    pedidoDTO.idSite = this.cadastroPeca.get('idSite').value;
    pedidoDTO.produto = this.pedidoProdutosLista;
    pedidoDTO.idTecnico = this.cadastroPeca.get('idTecnico').value;
    pedidoDTO.eaLogradouro = this.cadastroPeca.get('eaLogradouro').value;
    pedidoDTO.eaCep = this.cadastroPeca.get('eaCep').value;
    pedidoDTO.eaBairro = this.cadastroPeca.get('eaBairro').value;
    pedidoDTO.eaCidade = this.cadastroPeca.get('eaCidade').value;
    pedidoDTO.eaNum = this.cadastroPeca.get('eaNum').value;

    this.pedidoServico.alteraPedido(pedidoDTO).subscribe((resp) => {
      //console.log(resp.status);
    });
  }

}
