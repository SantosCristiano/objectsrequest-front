import { Pedido } from './pedido.model';

export class Tecnico {

        idTecnico: number;
        categoria: number;
        ultimoLogin: Date;
        fimVigencia: Date;
        inicioVigencia: Date;
        nome: string;
        senha: string;
        status: string;
        latitude: number;
        longitude: number;
        usuario: string;
        mobile: boolean;
        geolocalizacao: Date;
        tipoGeolocalizacao: string;
        erp: number;
        oracle: number;
        localResidente: boolean;
        pedidos: Array<Pedido>;
}

