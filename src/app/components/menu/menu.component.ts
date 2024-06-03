import { Visualizacao } from './../../services/servicoVisualizacao';
import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';


@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit {

  items: MenuItem[];

  constructor( ) { }

  ngOnInit() {
    this.items = [
      {
        label: 'Pedidos',
        icon: 'pi pi-fw pi pi-list',
        routerLink: '/app-home',
      },
      {
        label: 'Filtrar',
        icon: 'pi pi-fw pi pi-filter',
        command: (event: any) => {

      }
      },
      {
        label: 'ADM',
        icon: 'pi pi-fw pi pi-cog',
      },
      {
        label: 'Relatório',
        icon: 'pi pi-fw pi pi pi-table',
        routerLink: '/app-relatorio',
      },
      // {
      //   label: 'Sobre',
      //   icon: 'pi pi-fw pi-question-circle',
      //   routerLink: '/app-sobre'
      // },
    ];

  }

  alteraValorVisualizacao() {
    Visualizacao.setVisualiza(false);
  }
  deslogar() {
    sessionStorage.removeItem('Authorization');
  }
}
