import { TransporteDTO } from './../../model/transporteDTO.model';
import { HomeComponent } from "./../home/home.component";
import { FormControl } from "@angular/forms";
import { Visualizacao } from "./../../services/servicoVisualizacao";
import { ServicoPedido } from "./../../services/servico-pedido";
import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { PedidoService } from "../../services/pedido-service";
import { FiltrosDTO } from "../../model/filtrosDTO.model";
import { ProdutoDTO } from "../../model/produtoDTO.model";
import { TipoPedidoDTO } from "../../model/tipoPedidoDTO.model";
import { StatusDTO } from "../../model/statusDTO.model";
import { LocalizacaoDTO } from "../../model/localizacaoDTO.model";
import { FilialDTO } from "../../model/filialDTO.model";
import { DataSharingService } from "../../services/data-sharing.service";
import { StorageService } from '../../services/storage.service';
import {DropdownModule} from 'primeng/dropdown';
import { MenuItem } from 'primeng/api';

@Component({
  selector: "app-header",
  templateUrl: "./header.component.html",
  styleUrls: ["./header.component.scss"],
})
export class HeaderComponent implements OnInit {
  filial = "SÃO PAULO";
  esconderModal = true;
  filtrosCP: FiltrosDTO = new FiltrosDTO();
  filtros: FiltrosDTO = new FiltrosDTO();
  statusCP: StatusDTO;
  idTecnico: number;
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

  visibleSidebar3;

  visibleSidebar4;

  visibleSidebar5;

  visibleMenu;
  btFiltro: boolean = false;
  btAdm: boolean = false;
  btRelatorio: boolean = false;
  funcPesquisarPedido: boolean = false;
  localUser: any;
  local: boolean;
  residente: boolean;
  codigoDoPedido: number;

  isUserLoggedIn: boolean;

  items: MenuItem[];

  /*opcoes: Opcoes[];

  selectedOpcoes: Opcoes;*/

  constructor(
    private router: Router,
    public peds: PedidoService,
    public storage: StorageService,
    private dataSharingService: DataSharingService
  ) {
    // Subscribe here, this will automatically update
    // "isUserLoggedIn" whenever a change to the subject is made.
    this.dataSharingService.isUserLoggedIn.subscribe((value) => {
      this.isUserLoggedIn = value;
      this.ngOnInit();
    });
    this.dataSharingService.filialDTO.subscribe((value) => {
      this.filialPerfilDTO = value;
    });
    this.dataSharingService.statusDTO.subscribe((value) => {
      this.statusPerfilDTO = value;
      //console.log(this.statusPerfilDTO);
    });

    /*this.opcoes = [
      {name: 'Código do Pedido', code: "1"},
      {name: 'Código do Técnico', code: "2"}
  ];*/

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

    //console.log(sessionStorage);

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
          this.showDialogCP();
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
  }

  showDialogCP() {
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

  showDialogADM() {
    //console.log("ADM Modal");
    this.visibleSidebar2 = true;
  }

  enviarFiltrosParaHome() {
    //console.log(this.statusDTO);
    //console.log(this.filialDTO);
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
  }

  enviarNumPedidosHome() {
    //console.log(this.codigoDoPedido);
    this.dataSharingService.codigoDoPedido.next(this.codigoDoPedido);
    ServicoPedido.setNumPedidos(this.codigoDoPedido);
  }

  alteraValorVisualizacao() {
    Visualizacao.setVisualiza(false);
  }

  logout() {
    sessionStorage.clear();
    this.localUser = "";
    this.dataSharingService.codigoDoPedido.next(null);
    this.dataSharingService.filialDTO.next([]);
    this.dataSharingService.statusDTO.next([]);
    this.dataSharingService.isUserLoggedIn.next(false);
    this.filialPerfilDTO = [];
    this.statusPerfilDTO = [];
    this.visibleMenu = false;
    Visualizacao.setVisualiza(false);
    this.router.navigate(['app-login']);
  }

  // enviaPesquisaParaHome() {
  //   HomeComponent.setHeaderPesquisa(this.codigoDoPedido);
  //   console.log(HomeComponent.getHeaderPesquisa());
  // }

  //enviaDado() {
  //  console.log(this.filial);
  //}
}
