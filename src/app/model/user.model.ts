export class User {
  public usuario: string;
  public senha: string;
  public token: string;

  constructor(usuario: string, senha: string, token: string) {
    this.usuario = usuario;
    this.senha = senha;
    this.token = token;
  }

}
