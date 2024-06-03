import { FormControl } from '@angular/forms';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-altera-senha',
  templateUrl: './altera-senha.component.html',
  styleUrls: ['./altera-senha.component.sass']
})
export class AlteraSenhaComponent implements OnInit {
  usuario: FormControl;
  senha: FormControl;
  constructor() {
    this.usuario = new FormControl('');
    this.senha = new FormControl('');
  }

  ngOnInit() {
  }

  alterar() {

  }
}
