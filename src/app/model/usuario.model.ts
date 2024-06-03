import { Filial } from './filial.model';
import {Perfil} from './perfil.model';
export class Usuario {

        id: number;
        usuario: string;
        nome: string;
        senha: string;
        dataInicio: Date;
        dataFim: Date;
        dataUltimoAcesso: Date;
        perfis: Array<Perfil>;
        filiais: Array<Filial>;
}

