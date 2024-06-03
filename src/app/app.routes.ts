import { UsuariosComponent } from './components/usuarios/usuarios.component';
import { LocalizacaoComponent } from './components/localizacao/localizacao.component';
import { PerfilComponent } from './components/perfil/perfil.component';
import { ModalidadeEntregaComponent } from './components/modalidade-entrega/modalidade-entrega.component';
import { LoginComponent } from './components/security/login/login.component';
import { HomeComponent } from './components/home/home.component';
import { Routes, RouterModule } from '@angular/router';
import { ModuleWithProviders } from '@angular/core';
import { StatusPedidosComponent } from './components/status-pedidos/status-pedidos.component';
import { TipoPedidosComponent } from './components/tipo-pedidos/tipo-pedidos.component';
import { HeaderComponent } from './components/header/header.component';


export const ROUTES: Routes = [
{path : '', component: HomeComponent},
{path : 'app-login', component: LoginComponent},
{path : 'app-modalidade-entrega', component: ModalidadeEntregaComponent},
{path : 'app-perfil', component: PerfilComponent},
{path : 'app-status-pedidos', component: StatusPedidosComponent},
{path : 'app-tipo-pedidos', component: TipoPedidosComponent},
{path : 'app-localizacao', component: LocalizacaoComponent},
{path : 'app-usuarios', component: UsuariosComponent},
{path : 'app-home', component: HomeComponent}
]

export const routes:  ModuleWithProviders<unknown> = RouterModule.forRoot(ROUTES);

declare module "@angular/core" {
  interface ModuleWithProviders<T = any> {
      ngModule: Type<T>;
      providers?: Provider[];
  }
}
