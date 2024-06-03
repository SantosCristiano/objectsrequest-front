import { Status } from './status.model';
import { Pedido } from './pedido.model';
export class StatusPedidos {
        id: number;
        data: Date;
        usuario: string;
        status: Status;
        pedidos: Array<Pedido>;

}
