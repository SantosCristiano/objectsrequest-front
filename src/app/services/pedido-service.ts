import { Pedido } from './../model/pedido.model';
import { Tecnico } from './../model/tecnico.model';
import { API_CONFIG } from '../../environments/environment';
import { HttpClient, HttpHeaders, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { PedidoDTO } from "../model/pedidoDTO.model";
import { FiltrosDTO } from "../model/filtrosDTO.model";
import { VerificaDTO } from "../model/verificaDTO.model";
import { EquipamentoDTO } from '../model/equipamentoDTO.model';
import { Observable } from 'rxjs';

@Injectable()
export class PedidoService {
  token = "";
  constructor(public http: HttpClient) {}

  pedidoTodos(filtrosCP: FiltrosDTO): Observable<PedidoDTO[]> {
    // let parametros: HttpParams;
    // parametros = parametros.set(filtrosCP);

    return this.http.post<PedidoDTO[]>(`${API_CONFIG.baseUrl}/pedidos/todos`, filtrosCP);
  }

  pedidoPorCodigo(codigo: number) {
    // let parametros: HttpParams;
    // parametros = parametros.set(filtrosCP);
    return this.http.post(`${API_CONFIG.baseUrl}/pedidos/porCodigo`, codigo);
  }

  pedidoPorTecnico(tecnico: number) {
    return this.http.post(`${API_CONFIG.baseUrl}/pedidos/porTecnico`, tecnico);
  }

  inserirPedido(pDTO: PedidoDTO) {
    return this.http.post(`${API_CONFIG.baseUrl}/pedidos/insert`, pDTO, {
      observe: "response",
      responseType: "text",
    });
  }

  alteraPedido(pDTO: PedidoDTO) {
    return this.http.post(`${API_CONFIG.baseUrl}/pedidos/alteraStatus`, pDTO, {
      observe: "response",
      responseType: "text",
    });
  }

  updatePedido(pDTO: PedidoDTO) {
    return this.http.post(`${API_CONFIG.baseUrl}/pedidos/update/`, pDTO, {
      observe: "response",
      responseType: "text",
    });
  }

  filtroTodosCP() {
    return this.http.get(`${API_CONFIG.baseUrl}/filtros/criacaoPedidos`);
  }

  pesquisaBomEquip(equipamentoCP: EquipamentoDTO) {
    return this.http.post(`${API_CONFIG.baseUrl}/bom/pesquisaEquipamento`, equipamentoCP );
  }

  verficaTarefa(verificaDTO: VerificaDTO) {
    return this.http.post(`${API_CONFIG.baseUrl}/verificacao/verificaTarefa`,verificaDTO );
  }
  verficaSite(verificaDTO: VerificaDTO) {
    return this.http.post(
      `${API_CONFIG.baseUrl}/verificacao/verificaSite`,
      verificaDTO
    );
  }
  verficaTecnico(verificaDTO: VerificaDTO) {
    return this.http.post(
      `${API_CONFIG.baseUrl}/verificacao/verificaTecnico`,
      verificaDTO
    );
  }

}
