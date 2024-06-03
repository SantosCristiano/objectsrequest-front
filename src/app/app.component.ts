import { Visualizacao } from './services/servicoVisualizacao';
import { MODALIDADES } from './dados';
import { SharedService } from './services/shared.service';
import { Component } from '@angular/core';
import { PrimeNGConfig } from 'primeng/api';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'parts-request';
  showTemplate = false;
  public shared: SharedService;

  constructor(private primengConfig: PrimeNGConfig) {
    this.shared = SharedService.getInstance();
  }
  // tslint:disable-next-line: use-lifecycle-interface
  ngOnInit(): void {
    this.primengConfig.ripple = true;
    this.shared.showTemplate.subscribe(show => (this.showTemplate = show));
    Visualizacao.setVisualiza(false);
  }

  getVisualiza() {
    return Visualizacao.getVisualiza();
  }
}
