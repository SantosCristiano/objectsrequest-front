import { FormControl } from '@angular/forms';
import { Localizacao } from './../../model/localizacao.model';
import { LOCALIZA } from './../../dados';
import { Component, OnInit } from '@angular/core';
import { ThrowStmt } from '@angular/compiler';

@Component({
  selector: 'app-localizacao',
  templateUrl: './localizacao.component.html',
  styleUrls: ['./localizacao.component.scss']
})
export class LocalizacaoComponent implements OnInit {
  localizacao: Array<Localizacao> = LOCALIZA;
  nomeLocalizacao: FormControl = new FormControl('');
  local: Localizacao;
  constructor() {}

  ngOnInit() {}

  incluir() {
    if (this.nomeLocalizacao.value !== '') {
      this.local = new Localizacao();

      this.local.id = this.localizacao.length + 1;
      this.local.nomeLocalizacao = this.nomeLocalizacao.value.toUpperCase();
      this.localizacao.push(this.local);
      this.nomeLocalizacao = new FormControl('');
      //console.log(this.localizacao);
    } else {
      alert('Preencha o tipo de localização');
    }
  }

  remover(index: number) {
    this.localizacao.splice(index, 1);
    //console.log(this.localizacao);
  }
}
