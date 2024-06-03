import { Site } from './site.model';
import { Pedido } from './pedido.model';

export class Tarefa {

        id: number;
        site: Site;
        pedidos: Array<Pedido>;
}

