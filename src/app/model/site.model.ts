import { Filial } from './filial.model';
import { Tarefa } from './tarefa.model';

export class Site {

        id: number;
        latitude: number;
        longitude: number;
        bairro: string;
        cep: string;
        cidade: string;
        endereco: string;
        estado: string;
        pais: string;
        site: string;
        status: string;
        telefone: string;
        cliente: string;
        regiaoTecnica: number;
        tarefas: Array<Tarefa>;
        filial: Filial;
}
