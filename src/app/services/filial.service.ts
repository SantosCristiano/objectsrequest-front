import { API_CONFIG } from '../../environments/environment';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FilialDTO } from './../model/filialDTO.model';

@Injectable({
  providedIn: 'root'
})
export class FilialService {

  constructor(private http: HttpClient) { }

  filialTodos() {
    return this.http.get(`${API_CONFIG.baseUrl}/filiais/todos`);
  }


  filial(nome: string ) {
    return this.http.post(`${API_CONFIG.baseUrl}/filiais/nome`, nome);

  }

  inserirEstoque(fDTO: FilialDTO) {
    return this.http.post(`${API_CONFIG.baseUrl}/filiais/insert`, fDTO, {
      observe: "response",
      responseType: "text",
    });
  }

  alterarEstoque(fDTO: FilialDTO) {
    return this.http.post(`${API_CONFIG.baseUrl}/filiais/update`, fDTO, {
      observe: "response",
      responseType: "text",
    });
  }
}
