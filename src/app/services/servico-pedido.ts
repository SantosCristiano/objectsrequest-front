import { FiltrosDTO } from '../model/filtrosDTO.model';
export class ServicoPedido {
  private static filtros: FiltrosDTO = new FiltrosDTO();
  private static numpedidos: number = null;

  constructor() {}

  static getDados() {
    return ServicoPedido.filtros;
  }

  static setDados(valor: FiltrosDTO) {
    ServicoPedido.filtros = valor;
    //console.log(ServicoPedido.getDados());

  }


  static getNumPedidos() {
    //console.log('NUMERO É: '+ this.numpedidos);
    return ServicoPedido.numpedidos;
  }

  static setNumPedidos(valor: number) {
    ServicoPedido.numpedidos = valor;
    //console.log(ServicoPedido.getNumPedidos());
  }


}
