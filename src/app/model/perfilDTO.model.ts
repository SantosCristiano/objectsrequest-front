import { Usuario } from './usuario.model';
import { Funcionalidade } from './funcionalidade.model';
import { FuncionalidadeDTO } from './funcionalidadeDTO.model';
export class PerfilDTO {
  id: number;
  nome: string;
  funcionalidades: Array<FuncionalidadeDTO> = new Array<FuncionalidadeDTO>();
}
