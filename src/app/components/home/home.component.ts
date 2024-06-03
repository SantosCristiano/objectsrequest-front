//ng build --prod --base-href ./

import { TransporteDTO } from './../../model/transporteDTO.model';
import { Router } from "@angular/router";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { ServicoPedido } from "./../../services/servico-pedido";
import { Component, OnInit, Input } from "@angular/core";
import { PedidoService } from "../../services/pedido-service";
import { PedidoDTO } from "../../model/pedidoDTO.model";
import {
  concatMap,
  map,
  merge,
  switchMap,
  tap,
  delay,
  skip,
} from "rxjs/operators";
import {
  concat,
  of,
  Observable,
  BehaviorSubject,
  timer,
  interval,
  Subscription,
} from "rxjs";
import {
  ConfirmationService,
  Message,
  MessageService,
  SelectItem,
} from "primeng/api";
import { stringify } from "querystring";
import { StorageService } from "../../services/storage.service";
import {
  DialogService,
  DynamicDialogRef,
  DynamicDialogConfig,
} from "primeng/dynamicdialog";
import { FiltrosDTO } from "../../model/filtrosDTO.model";
import { Status } from "../../model/status.model";
import { LocalizacaoDTO } from "../../model/localizacaoDTO.model";
import { TipoPedidoDTO } from "../../model/tipoPedidoDTO.model";
import { StatusDTO } from "../../model/statusDTO.model";
import { ProdutoDTO } from "../../model/produtoDTO.model";
import { PedidoProdutosDTO } from "../../model/pedidoProdutosDTO.model";
import { VerificaDTO } from "../../model/verificaDTO.model";
import { BomDTO } from "../../model/bomDTO.model";
import { EquipamentoDTO } from "../../model/equipamentoDTO.model";
import { DataSharingService } from "../../services/data-sharing.service";
import { SharedService } from '../../services/shared.service';
import { UsuarioDTO } from '../../model/usuarioDTO.model';
import { FilialDTO } from '../../model/filialDTO.model';
import { UserService } from '../../services/user.service';
import { Tecnico } from "src/app/model/tecnico.model";
import { Visualizacao } from '../../services/servicoVisualizacao';
import { MenuItem } from 'primeng/api';

@Component({
  selector: "app-home",
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.scss"],
})
export class HomeComponent implements OnInit {
  private static headerPesquisa = "";
  id: number;
  pedido: Array<PedidoDTO> = new Array<PedidoDTO>();
  pedidoNovos: Array<PedidoDTO> = new Array<PedidoDTO>();
  bomDTO: Array<BomDTO> = new Array<BomDTO>();
  bomSelectDTO: Array<BomDTO> = new Array<BomDTO>();
  qtdPedidos: string;
  filtrosCP: FiltrosDTO = new FiltrosDTO();
  selectedStatusCP: string[] = [];
  statusCP: StatusDTO;
  equipamentoCP: EquipamentoDTO = new EquipamentoDTO();
  localizacaoCP: LocalizacaoDTO = new LocalizacaoDTO();
  produtosCP: ProdutoDTO[] = [];
  bomCP: BomDTO;
  tipoPedidoCP: TipoPedidoDTO;
  criacaoPedido: PedidoDTO = new PedidoDTO();
  retornoCriacaoPedido: PedidoDTO = new PedidoDTO();
  atualizaPedido: PedidoDTO = new PedidoDTO();
  usuarioUpdate: UsuarioDTO = new UsuarioDTO();
  idPedido: number;
  isActive = false;
  filtros: FiltrosDTO = new FiltrosDTO();
  pesquisa = "";
  header: HttpHeaders;
  numbers = timer(1000);
  responsiveOptions;
  msgs: Message[] = [];
  displayBasic: boolean;
  position: string;
  displayBasicCP: boolean;
  displayEntrega: boolean;
  displayPrevisaoEntrega: boolean;
  displayAlterarSenha: boolean;
  displayBasicEquip: boolean;
  displayIntegracao: boolean;
  verificaDTO: VerificaDTO = new VerificaDTO();
  tecnicoDTO: any;
  bomPorEquip: BomDTO[] = [];
  bomPorEquipSel: BomDTO[] = [];
  codigoDoPedido: number = null;
  codigoDoPedidoAnterior: number = null;
  checked: boolean = false;
  pesquisaBoolean: boolean = true;
  showSpinner: boolean = true;
  usuarioFilial: FilialDTO[];
  usuarioStatus: StatusDTO[];
  pt: any;

  moto: boolean;
  estoque: boolean;
  transportadora: boolean;

  // Menu
  visibleMenu;
  items: MenuItem[];
  btFiltro: boolean = false;
  btAdm: boolean = false;
  btRelatorio: boolean = false;
  funcPesquisarPedido: boolean = false;
  btCancelar: boolean = false;
  btAvancar: boolean = false;
  dtEntregaDevolucao: boolean = false;

  localUser: any;
  local: boolean;
  residente: boolean;

  rangeDates: Date[];
  minDate: Date;
  maxDate: Date;
  invalidDates: Array<Date>

  data: Date;

  @Input()
  testeClick = false;

  @Input()
  i: number;

  @Input()
  filter: Array<boolean> = new Array<boolean>();
  isOtherActive = false;

  btInserirPedido: boolean = false;
  btPesquisarPedido: boolean = false;
  btAtualizarEntrega: boolean = false;
  visualizarPedidos: boolean = false;

  statusDTO: StatusDTO[] = [];
  statusPerfilDTO: StatusDTO[] = [];
  localizacaoDTO: LocalizacaoDTO[] = [];
  transporteDTO: TransporteDTO[] = [];
  tipoPedidoDTO: TipoPedidoDTO[] = [];
  produtoDTO: ProdutoDTO[] = [];
  filialDTO: FilialDTO[] = [];
  filialPerfilDTO: FilialDTO[] = [];

  visibleSidebar1;
  visibleSidebar2;

  statusNovo: string;

  shared: SharedService = new SharedService();

  subscription: Subscription;
  clearMessage: Subscription
  //emit value in sequence every 10 second
  //source = interval(1000);
  source = timer(1000, 60000);
  source2 = interval(5000);

  time: boolean = true;
  //transporte: TransporteDTO[] = [];

  constructor(
    private http: HttpClient,
    private router: Router,
    public peds: PedidoService,
    private confirmationService: ConfirmationService,
    public storage: StorageService,
    private dataSharingService: DataSharingService,
    public userver: UserService
  ) {
    this.shared = SharedService.getInstance();
    this.subscription = this.source.subscribe((val) => this.pesquisarPedidos());

    this.clearMessage = this.source2.subscribe((val) => this.clearMessages());

    this.dataSharingService.filialDTO.subscribe((value) => {
      this.filialPerfilDTO = value;
    });
    this.dataSharingService.statusDTO.subscribe((value) => {
      this.statusPerfilDTO = value;
      //console.log(this.statusPerfilDTO);
    });

    this.dataSharingService.codigoDoPedido.subscribe((value) => {
      this.codigoDoPedido = value;
    });
    this.responsiveOptions = [
      {
        breakpoint: "8000px",
        numVisible: 13,
        numScroll: 13,
      },
      {
        breakpoint: "7200px",
        numVisible: 12,
        numScroll: 12,
      },
      {
        breakpoint: "5000px",
        numVisible: 12,
        numScroll: 12,
      },
      {
        breakpoint: "4000px",
        numVisible: 11,
        numScroll: 11,
      },
      {
        breakpoint: "3800px",
        numVisible: 11,
        numScroll: 11,
      },
      {
        breakpoint: "3600px",
        numVisible: 10,
        numScroll: 10,
      },
      {
        breakpoint: "3400px",
        numVisible: 10,
        numScroll: 10,
      },
      {
        breakpoint: "3200px",
        numVisible: 9,
        numScroll: 9,
      },
      {
        breakpoint: "3000px",
        numVisible: 8,
        numScroll: 8,
      },
      {
        breakpoint: "2800px",
        numVisible: 8,
        numScroll: 8,
      },
      {
        breakpoint: "2600px",
        numVisible: 7,
        numScroll: 7,
      },
      {
        breakpoint: "2400px",
        numVisible: 7,
        numScroll: 7,
      },
      {
        breakpoint: "2200px",
        numVisible: 6,
        numScroll: 6,
      },
      {
        breakpoint: "2000px",
        numVisible: 5,
        numScroll: 5,
      },
      {
        breakpoint: "1920px",
        numVisible: 5,
        numScroll: 5,
      },
      {
        breakpoint: "1800px",
        numVisible: 5,
        numScroll: 5,
      },
      {
        breakpoint: "1700px",
        numVisible: 5,
        numScroll: 5,
      },
      {
        breakpoint: "1600px",
        numVisible: 4,
        numScroll: 4,
      },
      {
        breakpoint: "1400px",
        numVisible: 3,
        numScroll: 3,
      },
      {
        breakpoint: "1200px",
        numVisible: 3,
        numScroll: 3,
      },
      {
        breakpoint: "992px",
        numVisible: 2,
        numScroll: 2,
      },
      {
        breakpoint: "768px",
        numVisible: 1,
        numScroll: 1,
      },
      {
        breakpoint: "576px",
        numVisible: 1,
        numScroll: 1,
      },
    ];
  }

  ngOnInit() {
    this.visibleMenu = true;
    this.localUser = this.storage.getLocalUser();
    this.local = false;
    this.residente = false;
    this.btFiltro = false;
    this.btAdm = false;
    this.btRelatorio = false;
    this.funcPesquisarPedido = false;
    this.btCancelar = false;
    this.btAvancar = false;
    this.dtEntregaDevolucao = false;

    this.pt = {
      firstDayOfWeek: 0,
      dayNames: [ "domingo","segunda","terça","quarta","quinta","sexta","sábado" ],
      dayNamesShort: [ "dom","seg","ter","qua","qui","sex","sáb" ],
      dayNamesMin: [ "Dm","Sg","Tr","Qr","Qn","Sx","Sb" ],
      monthNames: [ "janeiro","fevereiro","março","abril","maio","junho","julho","agosto","setembro","outubro","novembro","dezembro" ],
      monthNamesShort: [ "jan","fev","mar","abr","mai","jun","jul","ago","set","out","nov","dez" ],
      today: 'Hoje',
      clear: 'Limpar'
    }

    let today = new Date();
    let month = today.getMonth();
    let year = today.getFullYear();
    let prevMonth = (month === 0) ? 11 : month -1;
    let prevYear = (prevMonth === 11) ? year - 1 : year;
    let nextMonth = (month === 11) ? 0 : month + 1;
    let nextYear = (nextMonth === 0) ? year + 1 : year;
    this.minDate = new Date();
    this.minDate.setMonth(prevMonth);
    this.minDate.setFullYear(prevYear);
    this.maxDate = new Date();
    this.maxDate.setMonth(nextMonth);
    this.maxDate.setFullYear(nextYear);

    if (sessionStorage.getItem("btFiltro") != null) {
      this.btFiltro = true;
    }
    if (sessionStorage.getItem("btAdm") != null) {
      this.btAdm = true;
    }
    if (sessionStorage.getItem("btRelatorio") != null) {
      this.btRelatorio = true;
    }
    if (sessionStorage.getItem("funcPesquisarPedido") != null) {
      this.funcPesquisarPedido = true;
    }
    if (sessionStorage.getItem("btCancelar") != null) {
      this.btCancelar = true;
    }

    if (sessionStorage.getItem("btAvancar") != null) {
      this.btAvancar = true;
    }

    if (sessionStorage.getItem("dtEntregaDevolucao") != null) {
      this.dtEntregaDevolucao = true;
    }

    this.items = [
      {
        label: 'Pedidos',
        icon: 'pi pi-fw pi pi-list',
        visible: this.btFiltro,
        command: (event: any) => {
          this.pedidos();
        }
      },
      {
        label: 'Filtrar',
        icon: 'pi pi-fw pi pi-filter',
        visible: this.btFiltro,
        command: (event: any) => {
          this.showDialogCPFiltro();
        }
      },
      {
        label: 'ADM',
        icon: 'pi pi-fw pi pi-cog',
        visible: this.btAdm,
        command: (event: any) => {
          this.showDialogADM();
        }
      },
      {
        label: 'Relatório',
        icon: 'pi pi-fw pi pi pi-table',
        visible: this.btRelatorio,
        routerLink: '/app-relatorio',
      },
      // {
      //   label: 'Sobre',
      //   icon: 'pi pi-fw pi-question-circle',
      //   routerLink: '/app-sobre'
      // },
    ];

    //let invalidDate = new Date();
    //invalidDate.setDate(today.getDate() - 1);
    //this.invalidDates = [today,invalidDate];

    //console.log(this.shared.usuarioDTO)
    //console.log(this.shared.usuarioDTO != null)
    //console.log(this.shared.usuarioDTO != undefined)
    if(this.shared.usuarioDTO != null || this.shared.usuarioDTO != undefined) {
      if(this.shared.usuarioDTO.alteraSenha == true) {
        this.displayAlterarSenha = true;
        this.usuarioUpdate = this.shared.usuarioDTO;
      }
    }
    this.filtros = ServicoPedido.getDados();
    this.usuarioFilial = this.filtros.filialDTO;
    this.usuarioStatus = this.filtros.statusDTO;
    //console.log(this.usuarioFilial);
    //console.log(this.usuarioStatus);
    this.btInserirPedido = false;
    this.btPesquisarPedido = false;
    this.btAtualizarEntrega = false;
    this.visualizarPedidos = false;

    if (sessionStorage.getItem("btInserirPedido") != null) {
      this.btInserirPedido = true;
    }
    if (sessionStorage.getItem("btPesquisarPedido") != null) {
      this.btPesquisarPedido = true;
    }
    if (sessionStorage.getItem("btAtualizarEntrega") != null) {
      this.btAtualizarEntrega = true;
    }
    if (sessionStorage.getItem("visualizarPedidos") != null) {
      this.visualizarPedidos = true;
    }

    if (sessionStorage.getItem("Moto") != null) {
      this.moto = true;
    }
    if (sessionStorage.getItem("Transportadora") != null) {
      this.transportadora = true;
    }
    if (sessionStorage.getItem("Buscar no Estoque") != null) {
      this.estoque = true;
    }
  }

  static setHeaderPesquisa(novoValor: string) {
    HomeComponent.headerPesquisa = novoValor;
  }

  static getHeaderPesquisa() {
    return HomeComponent.headerPesquisa;
  }

  hideDialog() {
    this.displayBasicEquip = false;

    for (let index = 0; index < this.bomSelectDTO.length; index++) {
      //console.log(this.bomSelectDTO[index])
      this.bomSelectDTO[index].qtd = 1,
      this.bomSelectDTO[index].itemBom = true
      //console.log(this.bomSelectDTO[index])
    }
  }

  verificaPedido(pedido: PedidoDTO) {
    this.pesquisa = HomeComponent.getHeaderPesquisa();
    // console.log(this.pesquisa);
    this.filtros = ServicoPedido.getDados();
    if (
      (this.filtros[0] === true && pedido.nomeLocalizacao === "LOCAL") ||
      (this.filtros[1] === true && pedido.nomeLocalizacao === "RESIDENTE") ||
      (this.filtros[0] === false && this.filtros[1] === false)
    ) {
      return true;
    } else {
      // console.log('deu false');
      return false;
    }
  }
  verificaPesquisa(pedido: PedidoDTO) {
    this.pesquisa = HomeComponent.getHeaderPesquisa();
    // console.log('pedido código ' + pedido.id.toString());
    // console.log('pesquisa código ' + this.pesquisa);
    if (
      HomeComponent.getHeaderPesquisa() === null ||
      HomeComponent.getHeaderPesquisa() === "" ||
      pedido.idPedido.toString() === this.pesquisa
    ) {
      return true;
    } else {
      return false;
    }
  }

  abrirTelaCadastroPedido() {
    this.router.navigate(["app-cadastro-pedidos"]);
  }

  pegarDiferenca() {
    let r1 = this.pedidoNovos;
    let r2 = this.pedido;
  if(this.pedidoNovos == this.pedido){
    return false;
  }else{
    return true;
  }

}

compare(array1,array2){

  if(JSON.stringify(array1) !== JSON.stringify(array2)){
    //console.log(JSON.stringify(array1));
    //console.log(JSON.stringify(array2));
    return true;
  }
   //console.log(array1);
   return false;
}



pesquisarPedidos() {
  //console.log('O Valor do pesquisaBoolean é: '+this.pesquisaBoolean);
  //console.log("Pesquisa Pedidos");
  this.filtros = ServicoPedido.getDados();
  console.log("pesquisarPedidos! ")
  //console.log(this.filtros)

  if (this.codigoDoPedido < 1) {
    this.filtros.idPedido = null;
    this.filtros.idTecnico = null;
    this.pedidoNovos = new Array<PedidoDTO>();
    //console.log(this.filtros.statusDTO);

    if(this.filtros.statusDTO.length > 0) {
      for (let index = 0; index < this.filtros.statusDTO.length; index++) {
        if(this.filtros.statusDTO[index].status == "Finalizado" || this.filtros.statusDTO[index].status == "Cancelado") {
          this.filtros.statusDTO = this.filtros.statusDTO.filter(item => item.status != "Finalizado");
          this.filtros.statusDTO = this.filtros.statusDTO.filter(item => item.status != "Cancelado");
        }
      }
      //console.log(this.filtros.statusDTO)
    } else {
      // colocar filial do perfil
      // colocar status, nunca enviar vázio
    }

    if(this.filtros.transporteDTO.length > 0) {
      for (let index = 0; index < this.filtros.transporteDTO.length; index++) {
        if(!this.moto) {
          if(this.filtros.transporteDTO[index] != undefined) {
            // if(this.filtros.transporteDTO[index].nome == "Moto") {
              this.filtros.transporteDTO = this.filtros.transporteDTO.filter(item => item.nome != "Moto");
              //console.log(this.filtros.transporteDTO)
            // }
          }
        }
        if(!this.transportadora) {
          if(this.filtros.transporteDTO[index] != undefined) {
            // if(this.filtros.transporteDTO[index].nome == "Transportadora") {
              this.filtros.transporteDTO = this.filtros.transporteDTO.filter(item => item.nome != "Transportadora");
              //console.log(this.filtros.transporteDTO)
            // }
          }
        }
        if(!this.estoque) {
          if(this.filtros.transporteDTO[index] != undefined) {
            // if(this.filtros.transporteDTO[index].nome == "Buscar no Estoque") {
              this.filtros.transporteDTO = this.filtros.transporteDTO.filter(item => item.nome != "Buscar no Estoque");
              //console.log(this.filtros.transporteDTO)
            // }
          }
        }
      }
      //console.log(this.filtros.statusDTO)
    }

    //console.log(this.filtros.transporteDTO.length)
    if(this.filtros.transporteDTO.length == 0) {
      for (let index = 0; index < 1; index++) {
        //console.log(this.filtros.transporteDTO[index])
        if(!this.moto && !this.transportadora && !this.estoque) {
          this.filtros.transporteDTO.push({id: 100, nome: "Aleatorio"});
        }
        if(this.moto) {
          if(this.filtros.transporteDTO[index] == undefined) {
            this.filtros.transporteDTO.push({id: 1, nome: "Moto"});
            //console.log(this.filtros.transporteDTO)
          }
        }
        if(this.transportadora) {
          if(this.filtros.transporteDTO[index + 1] == undefined) {
            this.filtros.transporteDTO.push({id: 2, nome: "Transportadora"});
            //console.log(this.filtros.transporteDTO)
          }
        }
        if(this.estoque) {
          if(this.filtros.transporteDTO[index + 2] == undefined) {
            this.filtros.transporteDTO.push({id: 3, nome: "Buscar no Estoque"});
            //console.log(this.filtros.transporteDTO)
          }
        }
      }
    }

    if(this.filtros.filialDTO.length == 0) {
      this.filtros.filialDTO = this.usuarioFilial;
    }
    //console.log(this.filtros.statusDTO.length);
    if(this.filtros.statusDTO.length == 0) {
      this.filtros.statusDTO = this.usuarioStatus;
    }
      //console.log(this.filtros);
      this.peds.pedidoTodos(this.filtros).subscribe(response => {
        //console.log(response);
        //console.log('O Valor do check é: '+ this.checked);
        this.pedidoNovos = new Array<PedidoDTO>();
        this.pedidoNovos = this.pedidoNovos.concat(response["pDto"]);

        var data = new Date();
        console.log(data);
        console.log(this.pedidoNovos.length);

        //console.log(this.pedido.length);
        var toUTCDate = function(date){
          var _utc = new Date(date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate(),  date.getUTCHours(), date.getUTCMinutes(), date.getUTCSeconds());
          return _utc;
        };

        for (let index = 0; index < this.pedidoNovos.length; index++) {
          if(this.pedidoNovos[index].dtEntrega != null) {
            //console.log("Banco: ", this.pedidoNovos[index].dtEntrega)
            //this.pedidoNovos[index].dtEntrega = toUTCDate(new Date(this.pedidoNovos[index].dtEntrega))
            this.pedidoNovos[index].dtEntrega = new Date(this.pedidoNovos[index].dtEntrega)
            //console.log("New Date(): ", this.pedidoNovos[index].dtEntrega)
          }
        }

        if(this.pedido.length < 1){
          this.pedido =  this.pedidoNovos;
          //console.log("this.pedido.length < 1")
          //this.playAudio();
        } else if(this.pedidoNovos.length > this.pedido.length){
          this.pedido =  this.pedidoNovos;
          //console.log("this.pedidoNovos.length > this.pedido.length")
          this.playAudio();
        } else if(this.compare(this.pedidoNovos,this.pedido)){
          //this.pedido = new Array<PedidoDTO>();
          this.pedido =  this.pedidoNovos;
          //console.log("this.compare(this.pedidoNovos,this.pedido")
          //this.playAudio();
        }

        if (this.checked == true) {
          this.pedido = this.pedido.slice().reverse();
        }
        //console.log(this.pedido);
        this.qtdPedidos = "Total de Pedidos: " + this.pedido.length;
        //console.log(this.qtdPedidos)
        this.showSpinner = false;

      }, err => {
        //console.log(err);
        this.msgs = [{ severity: "error", summary: "Erro!", detail: "Erro ao buscar todos os pedidos!" },];
      })
  } else {
    if(this.codigoDoPedidoAnterior != this.codigoDoPedido) {
      //console.log(this.filtros)
      if(this.codigoDoPedido >= 52059) {
        this.pesquisarPedidosPorTecnico();
        //this.playAudio();
        this.showSpinner = false;
        this.codigoDoPedidoAnterior = this.codigoDoPedido;
      } else {
        this.pesquisarPedidosPorCodigo();
        //this.playAudio();
        this.showSpinner = false;
        this.codigoDoPedidoAnterior = this.codigoDoPedido;
      }
    }
  }
}

  pesquisarPedidosPorCodigo() {
    //console.log("Pesquisa Pedidos Por Código");
    this.pedido = new Array<PedidoDTO>();

    this.filtros.idPedido = this.codigoDoPedido;
      this.peds.pedidoTodos(this.filtros).subscribe((response) => {
        //console.log(response);
        this.pedido = this.pedido.concat(response["pDto"]);

        var data = new Date();
        console.log(data);
        console.log(this.pedido.length);
        //console.log(this.pedido);
        if (this.checked == true) {
          this.pedido = this.pedido.slice().reverse();
        }
        this.qtdPedidos = "Total de Pedidos: " + this.pedido.length;
        //console.log(this.qtdPedidos)
        //console.log(this.pedido.length)
        //this.displayBasicCP = false;

        var toUTCDate = function(date){
          var _utc = new Date(date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate(),  date.getUTCHours(), date.getUTCMinutes(), date.getUTCSeconds());
          return _utc;
        };

        for (let index = 0; index < this.pedido.length; index++) {
          if(this.pedido[index].dtEntrega != null) {
            this.pedido[index].dtEntrega = new Date(this.pedido[index].dtEntrega)

          }
        }
      }, err => {
        //console.log(err);
        this.qtdPedidos = "Total de Pedidos: 0";
        this.msgs = [{ severity: "warn", summary: "Alerta!", detail: "Pedido não encontrado!" },];
      })
  }
  pesquisarPedidosPorTecnico() {
    //console.log("Pesquisa Pedidos Por Técnico");
    this.pedido = new Array<PedidoDTO>();
      this.filtros.idTecnico = this.codigoDoPedido;
      this.peds.pedidoTodos(this.filtros).subscribe((response) => {
        //console.log(response);
        this.pedido = this.pedido.concat(response["pDto"]);

        var data = new Date();
        console.log(data);
        console.log(this.pedido.length);

        //console.log(this.pedido);
        if (this.checked == true) {
          this.pedido = this.pedido.slice().reverse();
        }
        this.qtdPedidos = "Total de Pedidos: " + this.pedido.length;
        console.log(this.qtdPedidos)
        //this.displayBasicCP = false;

        var toUTCDate = function(date){
          var _utc = new Date(date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate(),  date.getUTCHours(), date.getUTCMinutes(), date.getUTCSeconds());
          return _utc;
        };

        for (let index = 0; index < this.pedido.length; index++) {
          if(this.pedido[index].dtEntrega != null) {
            this.pedido[index].dtEntrega = new Date(this.pedido[index].dtEntrega)

          }
        }
      }, err => {
        //console.log(err);
        this.qtdPedidos = "Total de Pedidos: 0";
        this.msgs = [{ severity: "warn", summary: "Alerta!", detail: "Pedido não encontrado!" },];
      })
  }

  playAudio(){
    let audio = new Audio();
    audio.src = "assets/audio/notification.audio";

    audio.setAttribute('crossorigin', 'anonymous');
    audio.load();

    audio.play();

  }

  confirmPosition(position: string, idPedido: number, stPstatusStatus: string, tipoPedido: String, buscaPedido: boolean) {
    //console.log(buscaPedido)
    this.position = position;
    let localUser = this.storage.getLocalUser();

    if (stPstatusStatus === "Aberto" && tipoPedido === "Entrega" && buscaPedido == true) {
      this.statusNovo = "Em Análise";
    }

    if (stPstatusStatus === "Em Análise" && tipoPedido === "Entrega" && buscaPedido == true) {
      this.statusNovo = "Em Separação";
    }

    if (stPstatusStatus === "Em Separação" && tipoPedido === "Entrega" && buscaPedido == true) {
      this.statusNovo = "Emitindo NF";
    }

    if (stPstatusStatus === "Emitindo NF" && tipoPedido === "Entrega" && buscaPedido == true) {
      this.statusNovo = "Aguardando Retirada";
    }

    if (stPstatusStatus === "Aguardando Retirada" && tipoPedido === "Entrega" && buscaPedido == true) {
      this.statusNovo = "Finalizado";
    }

    if (stPstatusStatus === "Aberto" && tipoPedido === "Devolução") {
      this.statusNovo = "Aguardando Previsão";
    }

    if (stPstatusStatus === "Aguardando Previsão" && tipoPedido === "Devolução") {
      this.statusNovo = "Aguardando Retirada";
      this.displayPrevisaoEntrega = true;
      this.idPedido = idPedido;
    }

    if (stPstatusStatus === "Aguardando Retirada" && tipoPedido === "Devolução") {
      this.statusNovo = "Buscando";
      this.displayEntrega = true;
      this.idPedido = idPedido;
    }

    if (stPstatusStatus === "Buscando" && tipoPedido === "Devolução") {
      this.statusNovo = "Devolvendo";
    }

    if (stPstatusStatus === "Devolvendo" && tipoPedido === "Devolução") {
      this.statusNovo = "Recebido no Estoque";
    }

    if (stPstatusStatus === "Recebido no Estoque" && tipoPedido === "Devolução") {
      this.statusNovo = "Finalizado";
    }


    if (stPstatusStatus === "Aberto" && tipoPedido === "Entrega" && buscaPedido == false) {
      this.statusNovo = "Em Análise";
    }

    if (stPstatusStatus === "Em Análise" && tipoPedido === "Entrega" && buscaPedido == false) {
      this.statusNovo = "Em Separação";
    }

    if (stPstatusStatus === "Em Separação" && tipoPedido === "Entrega" && buscaPedido == false) {
      this.statusNovo = "Emitindo NF";
    }

    if (stPstatusStatus === "Emitindo NF" && tipoPedido === "Entrega" && buscaPedido == false) {
      this.statusNovo = "Aguardando Previsão";
    }

    if (stPstatusStatus === "Aguardando Previsão" && tipoPedido === "Entrega" && buscaPedido == false) {
      this.statusNovo = "Aguardando Envio";
      this.displayPrevisaoEntrega = true;
      this.idPedido = idPedido;
    }

    if (stPstatusStatus === "Aguardando Envio" && tipoPedido === "Entrega" && buscaPedido == false) {
      this.statusNovo = "Em Transporte";
      this.displayEntrega = true;
      this.idPedido = idPedido;
    }

    if (stPstatusStatus === "Em Transporte" && tipoPedido === "Entrega" && buscaPedido == false) {
      this.statusNovo = "Finalizado";
    }

    if(this.displayEntrega != true && this.displayPrevisaoEntrega != true){
      this.confirmationService.confirm({
        message: "Deseja Passar pedido " + idPedido + " para: " + this.statusNovo + " ?",
        header: "Próxima Fase",
        icon: "pi pi-info-circle",
        acceptLabel: 'Sim',
        rejectLabel: 'Não',
        accept: () => {
          let stPedido: PedidoDTO = new PedidoDTO();
          stPedido.idPedido = idPedido;
          stPedido.stPstatusUsuario = localUser.usuario;
          stPedido.stPstatusStatus = this.statusNovo;
          stPedido.buscaPedido = buscaPedido;

          this.peds.alteraPedido(stPedido).subscribe((response) => {
            //console.log(stPedido);
            //console.log(response);
            this.msgs = [
              {
                severity: "info",
                summary: "Confirmar",
                detail: "Status do pedido alterado com sucesso!",
              },
            ];
            this.source = interval(1000);
            this.pesquisarPedidos();
          }, err => {
            //console.log(err);
            this.msgs = [{ severity: "error", summary: "Erro!", detail: "Erro ao alterar status do pedido!" },];
          })
        },
        reject: () => {
          this.msgs = [
            { severity: "warn", summary: "Cancelado", detail: "Você não alterou o Status do pedido!" },
          ];
        },
        key: "positionDialog",
      });
    }
  }

  cancelPosition(position: string, idPedido: number, stPstatusStatus: string, tipoPedido: String, buscaPedido: boolean) {
    this.position = position;
    let localUser = this.storage.getLocalUser();

    this.confirmationService.confirm({
      message: "Deseja Cancelar o Pedido " + idPedido + "?",
      header: "Cancelamento",
      icon: "pi pi-info-circle",
      acceptLabel: 'Sim',
      rejectLabel: 'Não',
      accept: () => {
        let stPedido: PedidoDTO = new PedidoDTO();
        stPedido.idPedido = idPedido;
        stPedido.stPstatusUsuario = localUser.usuario;
        stPedido.stPstatusStatus = "Cancelado";
        stPedido.buscaPedido = buscaPedido;

        this.peds.alteraPedido(stPedido).subscribe((response) => {
          //console.log(response);
          this.msgs = [
            { severity: "warn", summary: "Cancelado", detail: "Pedido cancelado com sucesso!" },
          ];
          this.source = interval(1000);
          this.pesquisarPedidos();
        }, err => {
          //console.log(err);
          this.msgs = [{ severity: "error", summary: "Erro!", detail: "Erro ao cancelar o pedido!" },];
        })
      },
      reject: () => {
        this.msgs = [
          {
            severity: "info",
            summary: "Cancelado",
            detail: "Pedido não foi cancelado!",
          },
        ];
      },

      key: "positionDialog",
    });
  }

  aberto(st) {
    if (st === "Aberto") {
      return true;
    } else {
      return false;
    }
  }

  devolucao(st) {
    if (st === "Devolução") {
      return true;
    } else {
      return false;
    }
  }
  aguardandoRetirada(st) {
    if (st === "Aguardando Retirada") {
      return true;
    } else {
      return false;
    }
  }
  emAnalise(st) {
    if (st === "Em Análise") {
      return true;
    } else {
      return false;
    }
  }
  emSeparacao(st) {
    if (st === "Em Separação") {
      return true;
    } else {
      return false;
    }
  }
  emitindoNf(st) {
    if (st === "Emitindo NF") {
      return true;
    } else {
      return false;
    }
  }

  aguardandoPrevisao(st) {
    if (st === "Aguardando Previsão") {
      return true;
    } else {
      return false;
    }
  }

  aguardandoEnvio(st) {
    if (st === "Aguardando Envio") {
      return true;
    } else {
      return false;
    }
  }
  emTransporte(st) {
    if (st === "Em Transporte") {
      return true;
    } else {
      return false;
    }
  }
  buscando(st) {
    if (st === "Buscando") {
      return true;
    } else {
      return false;
    }
  }
  devolvendo(st) {
    if (st === "Devolvendo") {
      return true;
    } else {
      return false;
    }
  }
  recebidoNoEstoque(st) {
    if (st === "Recebido no Estoque") {
      return true;
    } else {
      return false;
    }
  }
  finalizado(st) {
    if (st === "Finalizado") {
      return true;
    } else {
      return false;
    }
  }

  cancelado(st) {
    if (st === "Cancelado") {
      return true;
    } else {
      return false;
    }
  }

  mudaStatus(ped: PedidoDTO) {

    this.peds.alteraPedido(ped).subscribe((response) => {
      this.msgs = [
        {
          severity: "info",
          summary: "Confirmar",
          detail: "Status alterado",
        },
      ];
      this.source = interval(1000);
      this.pesquisarPedidos();
    }, err => {
      //console.log(err);
      this.msgs = [{ severity: "error", summary: "Erro!", detail: "Erro ao alterar Status" },];
    })
  }

  atualizarEntrega(pedido: PedidoDTO) {
    this.displayEntrega = false;
    let localUser = this.storage.getLocalUser();
    pedido.idPedido = this.idPedido;
    pedido.stPstatusStatus = this.statusNovo;
    pedido.stPstatusUsuario = localUser.usuario;

    this.peds.alteraPedido(pedido).subscribe((response) => {
      //console.log(response);
      this.msgs = [
        {
          severity: "info",
          summary: "Confirmar",
          detail: "Status e Informações de Entrega Alterados",
        },
      ];
      this.source = interval(1000);
      this.pesquisarPedidos();
    }, err => {
      //console.log(err);
      this.msgs = [{ severity: "error", summary: "Erro!", detail: "Erro ao alterar Status e Informações de Entrega!" },];
    })

    this.atualizaPedido.nomeEntregador = "";
    this.atualizaPedido.telefoneEntregador = "";
    this.atualizaPedido.observacao = "";

  }

  atualizarPrevisaoEntrega(pedido: PedidoDTO) {
    this.displayPrevisaoEntrega = false;
    let localUser = this.storage.getLocalUser();
    pedido.idPedido = this.idPedido;
    pedido.stPstatusStatus = this.statusNovo;
    pedido.stPstatusUsuario = localUser.usuario;

    //console.log(pedido);

    //var localTime = new Date();

    //pedido.dtEntrega.setHours(pedido.dtEntrega.getHours() - (localTime.getTimezoneOffset() / 60));

    this.peds.alteraPedido(pedido).subscribe((response) => {
      //console.log(response);
      this.msgs = [
        {
          severity: "info",
          summary: "Confirmar",
          detail: "Status e Data de Entrega Alterados",
        },
      ];
      this.source = interval(1000);
      this.pesquisarPedidos();
    }, err => {
      //console.log(err);
      this.msgs = [{ severity: "error", summary: "Erro!", detail: "Erro ao alterar Status e Data de Entrega!" },];
    })

    this.atualizaPedido.dtEntrega = null;

  }

  atualizarSenha(usuario: UsuarioDTO) {
    this.displayAlterarSenha = false;
    this.userver.alterarSenha(usuario).subscribe((response) => {
      //console.log(response);
      this.msgs = [
        {
          severity: "info",
          summary: "Confirmar",
          detail: "Senha alterada com sucesso!",
        },
      ];
    }, err => {
      //console.log(err);
      this.msgs = [{ severity: "error", summary: "Erro!", detail: "Erro ao alterar Senha!" },];
    })

    this.usuarioUpdate.senha = "";
  }

  alterarDataEntrega(ped: PedidoDTO) {

    //var localTime = new Date();

    // ped.dtEntrega.setHours(ped.dtEntrega.getHours() - (localTime.getTimezoneOffset() / 60));

    this.peds.alteraPedido(ped).subscribe((response) => {
      //console.log(response);
      this.msgs = [
        {
          severity: "info",
          summary: "Confirmado",
          detail: "Data de entrega alterada",
        },
      ];
      this.source = interval(1000);
      this.pesquisarPedidos();
    }, err => {
      //console.log(err);
      this.msgs = [{ severity: "error", summary: "Erro!", detail: "Erro ao alterar data de entrega!" },];
    })

  }

  showDialogCPFiltro() {
    //console.log("Pesquisa Filtros");
    this.peds.filtroTodosCP().subscribe((response) => {
      //console.log(response);
      this.filtrosCP = response["filtroCP"];
      this.filtrosCP.filialDTO = this.filialPerfilDTO;
      this.filtrosCP.statusDTO  = this.statusPerfilDTO;
      //console.log(this.filtrosCP);
      this.visibleSidebar1 = true;
    });
  }

  showDialogCP() {
    //console.log("Pesquisa Filtros");
    this.pesquisaBoolean = false;
    this.criacaoPedido = new PedidoDTO();
    this.selectedStatusCP = [];
    this.statusCP = new StatusDTO();
    this.tipoPedidoCP = new TipoPedidoDTO();
    this.equipamentoCP = new EquipamentoDTO();
    this.localizacaoCP = new LocalizacaoDTO();
    this.produtosCP = [];
    this.bomCP = new BomDTO();
    this.bomSelectDTO = [];
    this.filtrosCP = new FiltrosDTO();
    this.peds.filtroTodosCP().subscribe((response) => {
      //console.log(response);
      this.filtrosCP = response["filtroCP"];
      //console.log(this.filtrosCP);
      this.displayBasicCP = true;
    }, err => {
      //console.log(err);
      alert("Erro nos Filtros! Servidor Fora do ar!")
      this.criacaoPedido.idSite = null;
      //this.msgs = [{ severity: "error", summary: "Erro!", detail: "Tarefa inválida!" },];
    })
  }

  showDialogEntrega() {
    this.displayEntrega = true;
  }

  showDialogPrevisaoEntrega() {
    this.displayPrevisaoEntrega = true;
  }

  showDialogPecas() {
    //console.log(this.equipamentoCP);
    if(this.equipamentoCP.equipamento != null){
      //console.log("Pesquisa Peças");
      this.peds.pesquisaBomEquip(this.equipamentoCP).subscribe((response) => {
        //console.log(response);
        this.bomDTO = response["bDto"];
        //console.log(this.bomDTO);
        this.displayBasicEquip = true;
      }, err => {
        //console.log(err);
        alert("Equipamento inválido!")
        //this.msgs = [{ severity: "error", summary: "Erro!", detail: "Tarefa inválida!" },];
      })
    } else {
      alert("Você precisa selecionar o equipamento!")
    }
  }

  adicionarManualmente() {
    alert("Atenção ao adicionar peças manualmente, sempre verifique se a peça em questão não está cadastrada no sistema!");
    //console.log("adicionarManualmente");
    //console.log(this.bomSelectDTO);
    //let index = this.bomSelectDTO.length + 1;
    let random = Math.random() * 100000000;
    let string = random.toString();
    let slice = string.slice(0, 7);
    let index = parseInt(slice);
    this.bomSelectDTO.push({
      id: index,
      itemFamily: 'Peça Manual',
      productCode: '86.608.90284-1',
      productName: 'AMBIENTE',
      itemCode: '',
      itemDescription: '',
      qtd: 1,
      attribute1: 'Y',
      destroyFlag: null,
      itemBom: false,
    });
  }

  inserirProdutos() {
    //console.log("inserirProdutos");
    this.displayBasicEquip = false;
  }

  limparCamposEndereco() {
    this.criacaoPedido.buscaPedido = false;
    this.criacaoPedido.eaLogradouro = "";
    this.criacaoPedido.eaNum = "";
    this.criacaoPedido.eaCep = "";
    this.criacaoPedido.eaBairro = "";
    this.criacaoPedido.eaCidade = "";
    //console.log(this.criacaoPedido.buscaPedido)
  }

  alterarTransporte(criacaoPedido) {
    if(criacaoPedido.transporte.id == 3) {
      this.criacaoPedido.buscaPedido = true;
      this.criacaoPedido.eaLogradouro = "BUSCAR NO ESTOQUE";
      this.criacaoPedido.eaNum = "0000";
      this.criacaoPedido.eaCep = "00000000";
      this.criacaoPedido.eaBairro = "ESTOQUE";
      this.criacaoPedido.eaCidade = "ESTOQUE";
    } else {
      if(this.criacaoPedido.buscaPedido) {
        this.criacaoPedido.eaLogradouro = "";
        this.criacaoPedido.eaNum = "";
        this.criacaoPedido.eaCep = "";
        this.criacaoPedido.eaBairro = "";
        this.criacaoPedido.eaCidade = "";
      }
      this.criacaoPedido.buscaPedido = false;
    }
  }

  // buscarNoEstoque() {
  //   this.criacaoPedido.buscaPedido = true;
  //   this.criacaoPedido.eaLogradouro = "BUSCAR NO ESTOQUE";
  //   this.criacaoPedido.eaNum = "0000";
  //   this.criacaoPedido.eaCep = "00000000";
  //   this.criacaoPedido.eaBairro = "ESTOQUE";
  //   this.criacaoPedido.eaCidade = "ESTOQUE";
  //   //console.log(this.criacaoPedido.buscaPedido)
  // }

  hideIntegracaoTotvs() {
    this.displayIntegracao = false;
  }

  inserirPedidoCP() {

    if(this.statusCP.status == undefined || this.tipoPedidoCP.tipoPedido == undefined) {
      alert("Você precisa selecionar o Tipo do Pedido e o Status!")
      return;
    }

    if(this.criacaoPedido.transporte == undefined || this.criacaoPedido.transporte == null) {
      alert("Você precisa selecionar o Meio de Transporte!")
      return;
    }

    //console.log(this.bomSelectDTO)
    if(this.bomSelectDTO.length > 0 ) {
      let verificado = false
      //console.log(this.bomSelectDTO)
      for (let index = 0; index < this.bomSelectDTO.length; index++) {
        //console.log(this.bomSelectDTO[index].itemCode)
        let itemCode = this.bomSelectDTO[index].itemCode
        let qtd = this.bomSelectDTO[index].qtd

        //console.log(itemCode)
        //console.log(qtd)
        //console.log(verificado)
        if(itemCode == null || itemCode == undefined || itemCode == "" || qtd == null || qtd == undefined) {
          alert("Código do Item e/ou Quantidade precisa ser preenchido!")
          verificado = false;
          return;
        } else {
          verificado = true;
        }
      }
      if(verificado) {
        //console.log("Inserir Pedidos");
        let criarPedido: PedidoDTO = new PedidoDTO();
        let localUser = this.storage.getLocalUser();
        //console.log(this.criacaoPedido);
        //console.log(this.bomSelectDTO);
        for (let index = 0; index < this.bomSelectDTO.length; index++) {
          //console.log(this.bomSelectDTO[index].itemCode)
          criarPedido.produto.push({
            prodQtd: this.bomSelectDTO[index].qtd,
            itemCodigo: this.bomSelectDTO[index].itemCode,
            prodCodigo: this.bomSelectDTO[index].productCode,
            itemDescription: this.bomSelectDTO[index].itemDescription,
            itemBom: this.bomSelectDTO[index].itemBom,
            verificadoTotvs: false,
            temSaldoTotvs: false,
            requisitadoTotvs: false,
            mensagemTotvs: "",
            quantidadeTotvs: 0,
          });
        }
        criarPedido.stPstatusUsuario = localUser.usuario;
        criarPedido.stPstatusStatus = this.statusCP.status;
        criarPedido.nomeLocalizacao = this.localizacaoCP.nomeLocalizacao;
        criarPedido.tipoPedido = this.tipoPedidoCP.tipoPedido;
        criarPedido.idTarefa = this.criacaoPedido.idTarefa;
        criarPedido.idTecnico = this.criacaoPedido.idTecnico;
        criarPedido.eaLogradouro = this.criacaoPedido.eaLogradouro;
        criarPedido.eaCep = this.criacaoPedido.eaCep;
        criarPedido.eaBairro = this.criacaoPedido.eaBairro;
        criarPedido.eaCidade = this.criacaoPedido.eaCidade;
        criarPedido.eaNum = this.criacaoPedido.eaNum;
        criarPedido.regiaoTecnica = this.criacaoPedido.regiaoTecnica;
        criarPedido.buscaPedido = this.criacaoPedido.buscaPedido;
        criarPedido.transporte = this.criacaoPedido.transporte;

        console.log(criarPedido);
        //console.log(JSON.stringify(criarPedido));

        //console.log(criarPedido);
        this.peds.inserirPedido(criarPedido).subscribe((response) => {
          // console.log(JSON.parse(response.body));
          this.retornoCriacaoPedido = JSON.parse(response.body)
          if(this.retornoCriacaoPedido.idPedido != null) {
            this.msgs = [
              { severity: "info", summary: "Confimado", detail: "Pedido inserido com sucesso!" },
            ];
            this.displayBasicCP = false;
          } else {
            this.displayIntegracao = true;
          }

          // this.msgs = [
          //   { severity: "info", summary: "Confimado", detail: "Pedido inserido com sucesso!" },
          // ];
          this.source = interval(1000);
          this.pesquisarPedidos();

        }, err => {
          //console.log(err);
          this.msgs = [
            { severity: "error", summary: "Erro!", detail: "Pedido não inserido! Verifique os dados e tente novamente! Ou servidor fora do ar!" },
          ];
          alert("Pedido não inserido! Verifique os dados e tente novamente! Ou servidor fora do ar!")
        });
        // this.displayBasicCP = false;
        this.pesquisaBoolean = true;
      }
    } else {
      alert("Você precisa selecionar o equipamento e adicionar as peças e quantidades!")
    }
  }

  verficaTarefa() {
    //console.log(this.criacaoPedido.idTarefa);
    this.verificaDTO = new VerificaDTO();
    this.verificaDTO.idTarefa = this.criacaoPedido.idTarefa;
    this.peds.verficaTarefa(this.verificaDTO).subscribe((response) => {
      if(response["verificaDTO"] != null) {
        //console.log(response);
        this.verificaDTO = response["verificaDTO"];
        //console.log(this.verificaDTO);
        this.criacaoPedido.idSite = this.verificaDTO.idSite;
        this.criacaoPedido.nmSite = this.verificaDTO.nmSite;
        this.criacaoPedido.nSerie = this.verificaDTO.nSerie;
        this.criacaoPedido.regiaoTecnica = this.verificaDTO.regiaoTecnica;
        //console.log(this.verificaDTO.enderecoSite);
        let endereco = this.verificaDTO.enderecoSite.split(" - ");
        let numero = endereco[0].split(",");
        this.criacaoPedido.eaLogradouro = numero[0];

        this.criacaoPedido.eaCep = endereco[1].replace("-", "");
        this.criacaoPedido.eaBairro = endereco[2];
        this.criacaoPedido.eaCidade = endereco[3];

        this.equipamentoCP = {
          equipamento: this.verificaDTO.descricaoDoEquipamento,
        };

        this.criacaoPedido.eaNum = numero[1];
        //console.log(this.equipamentoCP);
      } else {
        alert("Tarefa inválida!");
        this.criacaoPedido.idTarefa = null;
      }
    }, err => {
      //console.log(err);
      alert("Tarefa inválida!")
      this.criacaoPedido.idTarefa = null;
      //this.msgs = [{ severity: "error", summary: "Erro!", detail: "Tarefa inválida!" },];
    });
  }

  verficaSite() {
    //console.log(this.criacaoPedido.idSite);
    this.verificaDTO = new VerificaDTO();
    this.verificaDTO.idSite = this.criacaoPedido.idSite;
    this.peds.verficaTecnico(this.verificaDTO).subscribe((response) => {
      //console.log(response);
      this.verificaDTO = response["verificaDTO"];
      //console.log(this.verificaDTO);
    }, err => {
      //console.log(err);
      alert("Site inválido!")
      this.criacaoPedido.idSite = null;
      //this.msgs = [{ severity: "error", summary: "Erro!", detail: "Tarefa inválida!" },];
    })
  }

  verficaTecnico() {
    //console.log(this.criacaoPedido.idTecnico);
    this.verificaDTO = new VerificaDTO();
    this.tecnicoDTO = new Tecnico();
    this.verificaDTO.idTecnico = this.criacaoPedido.erpId;
    this.peds.verficaTecnico(this.verificaDTO).subscribe((response) => {
      //console.log(response);
      this.tecnicoDTO = response;

      let dataAtual: Date = new Date();
      let dataBanco = new Date(this.tecnicoDTO.fimVigencia);

      //console.log(dataAtual)
      //console.log(dataBanco)

      if(dataAtual.getTime() < dataBanco.getTime()) {
        //console.log("Entrou!");
        if(this.tecnicoDTO.localResidente == "0" || this.tecnicoDTO.localResidente == "LOCAL") {
          this.localizacaoCP.nomeLocalizacao = "LOCAL";
          //this.localizacaoCP = this.tecnicoDTO.localResidente;
        } else {
          this.localizacaoCP.nomeLocalizacao = "RESIDENTE";
          //this.localizacaoCP = this.tecnicoDTO.localResidente;
        }
        this.criacaoPedido.idTecnico = this.tecnicoDTO.idTecnico;
        this.criacaoPedido.nmTecnico = this.tecnicoDTO.nome;
      } else {
        alert("Este Técnico está inativo no sistema!")
        this.criacaoPedido.idTecnico = null;
        this.localizacaoCP.nomeLocalizacao = "";
        //this.msgs = [{ severity: "error", summary: "Erro!", detail: "Este Técnico está inativo no sistema!" },];
      }
    }, err => {
      //console.log(err);
      alert("Técnico inválido!")
      this.criacaoPedido.idTecnico = null;
      this.localizacaoCP.nomeLocalizacao = "";
      //this.msgs = [{ severity: "error", summary: "Erro!", detail: "Tarefa inválida!" },];
    })
  }

  clearMessages() {
    this.msgs = [];
  }

  showDialogADM() {
    //console.log("ADM Modal");
    this.visibleSidebar2 = true;
  }

  ordenar() {
    this.source = interval(1000);
    this.pesquisarPedidos();
  }

  enviarNumPedidosHome() {
    this.source = interval(1000);
    //console.log("enviarFiltrosParaHome 1 Segundo!",1000)
    //console.log(this.codigoDoPedido);
    this.dataSharingService.codigoDoPedido.next(this.codigoDoPedido);
    ServicoPedido.setNumPedidos(this.codigoDoPedido);
    this.pesquisarPedidos();
  }

  pedidos() {
    //console.log(this.codigoDoPedido);
    this.filtros.idPedido = null;
    this.filtros.idTecnico = null;
    this.filialDTO = [];
    this.tipoPedidoDTO = [];
    this.statusDTO = [];
    this.localizacaoDTO = [];
    this.transporteDTO = [];
    this.codigoDoPedido = null;
    this.dataSharingService.codigoDoPedido.next(this.codigoDoPedido);
    ServicoPedido.setNumPedidos(this.codigoDoPedido);
    this.enviarFiltrosParaHome();
    this.router.navigate(['app-home']);
    this.pesquisarPedidos();
  }


  enviarFiltrosParaHome() {
    //console.log(this.statusDTO);
    //console.log(this.filialDTO);
    this.source = interval(1000);
    //console.log("enviarFiltrosParaHome 1 Segundo!",1000)
    if(this.statusDTO.length == 0) {
      this.filtros.statusDTO  = this.statusPerfilDTO;
    } else {
      this.filtros.statusDTO = this.statusDTO;
    }

    if(this.filialDTO.length == 0) {
      this.filtros.filialDTO = this.filialPerfilDTO;
    } else {
      this.filtros.filialDTO = this.filialDTO;
    }
    this.filtros.tipoPedidoDTO = this.tipoPedidoDTO;
    this.filtros.localizacaoDTO = this.localizacaoDTO;
    this.filtros.transporteDTO = this.transporteDTO;
    this.filtros.produtoDTO = this.produtoDTO;
    //console.log(this.filtros);
    ServicoPedido.setDados(this.filtros);
    this.visibleSidebar1 = false;
    this.pesquisarPedidos();
  }

}
