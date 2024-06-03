import { PedidoProdutos } from './pedidoProdutos.model';
export class Produto {

        id: number;
        destroyFlag: number;
        itemCode: string;
        itemDescription: string;
        itemFamily: string;
        productCode: string;
        productName: string;
        attribute1: string;
        pedidosProdutos: Array<PedidoProdutos>;
        qtd: number;
}
