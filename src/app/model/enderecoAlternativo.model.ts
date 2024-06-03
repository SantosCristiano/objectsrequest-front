import { Pedido } from './pedido.model';

export class EnderecoAlternativo {
        id: number;
        logradouro: string;
        cep: string;
        bairro: string;
        cidade: string;
        numero: string;
        pedidos: Array<Pedido>;
}
