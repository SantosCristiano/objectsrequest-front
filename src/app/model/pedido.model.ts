import { ModalidadeEntrega } from './modalidadeEntrega.model';
import { EnderecoAlternativo } from './enderecoAlternativo.model';
import { PedidoProdutos } from './pedidoProdutos.model';
import { Tecnico } from './tecnico.model';
import { TipoPedido } from './tipoPedido.model';
import { Localizacao } from './localizacao.model';
import { StatusPedidos } from './statusPedido.model';
import { Tarefa } from './tarefa.model';
export class Pedido {

        id: number;
        statusPedidos: Array<StatusPedidos>;
        localizacao: Localizacao;
        tipoPedido: TipoPedido;
        tarefa: Tarefa;
        tecnico: Tecnico;
        pedidoProdutos: Array<PedidoProdutos>;
        enderecoAlternativo: EnderecoAlternativo;
        modalidadeEntrega: ModalidadeEntrega;
        dtEntrega: Date;
}
