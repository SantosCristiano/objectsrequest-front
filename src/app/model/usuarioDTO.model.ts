import { Tecnico } from './tecnico.model';
import { PerfilDTO } from './perfilDTO.model';
import { FilialDTO } from './filialDTO.model';
export class UsuarioDTO {
  id: number;
  usuario: string;
  nome: string;
  senha: string;
  dataInicio: Date;
  dataFim: Date;
  dataUltimoAcesso: Date;
  perfis: Array<PerfilDTO>;
  filiais: Array<FilialDTO>;
  tecnico: Tecnico;
  alteraSenha: boolean;
}

