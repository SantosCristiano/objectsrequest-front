import { Component, OnInit } from '@angular/core';
import { API_CONFIG } from '../../../environments/environment';
import { Visualizacao } from '../../services/servicoVisualizacao';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {
  now = new Date;
  year = this.now.getFullYear();
  version = API_CONFIG.version;

  constructor() { }

  ngOnInit() {

  }

  getVisualiza() {
    //console.log(Visualizacao.getVisualiza())
    return Visualizacao.getVisualiza();
  }

}
