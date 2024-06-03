import { Usuario } from './usuario.model';
import { Funcionalidade } from './funcionalidade.model';
export class Perfil {

         id: number;
         nome: string;
         usuarios: Array<Usuario>;
         funcionalidades: Array<Funcionalidade>;


}
