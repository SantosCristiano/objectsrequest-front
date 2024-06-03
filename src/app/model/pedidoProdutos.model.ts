import { NotaFiscal } from './notaFiscal.model';
import { Pedido } from './pedido.model';
import { Produto } from './produto.model';

export class PedidoProdutos {

        id: number;
        quantidade: number;
        pedidos: Array<Pedido>;
        produtos: Array<Produto>;
        notaFiscal: Array<NotaFiscal>;


}
