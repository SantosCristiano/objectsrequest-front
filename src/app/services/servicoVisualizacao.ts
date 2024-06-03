export class Visualizacao {

  private static visualiza: boolean;

  constructor() {
  }

  static getVisualiza() {
    return Visualizacao.visualiza;
  }

  static setVisualiza(valor: boolean) {
    Visualizacao.visualiza = valor;
  }

}
