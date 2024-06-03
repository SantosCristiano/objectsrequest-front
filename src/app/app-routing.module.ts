import { RelatorioComponent } from './components/relatorio/relatorio.component';
import { FiliaisComponent } from './components/filiais/filiais.component';
import { UsuariosComponent } from './components/usuarios/usuarios.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/security/login/login.component';
import { ModalidadeEntregaComponent } from './components/modalidade-entrega/modalidade-entrega.component';
import { PerfilComponent } from './components/perfil/perfil.component';
import { StatusPedidosComponent } from './components/status-pedidos/status-pedidos.component';
import { TipoPedidosComponent } from './components/tipo-pedidos/tipo-pedidos.component';
import { LocalizacaoComponent } from './components/localizacao/localizacao.component';
import { CadastroPedidosComponent } from './components/home/cadastro-pedidos/cadastro-pedidos.component';
import { PedidosComponent } from './components/home/pedidos/pedidos.component';
import { AlteraSenhaComponent } from './components/altera-senha/altera-senha.component';
import { AuthGuard } from './services/auth.guard';
import { HeaderComponent } from './components/header/header.component';

const routes: Routes = [
  {path: '', component: HomeComponent, canActivate:[AuthGuard]},
  {path: 'app-login', component: LoginComponent},
  {path: 'app-modalidade-entrega', component: ModalidadeEntregaComponent, canActivate:[AuthGuard]},
  {path: 'app-perfil', component: PerfilComponent, canActivate:[AuthGuard]},
  {path: 'app-status-pedidos', component: StatusPedidosComponent, canActivate:[AuthGuard]},
  {path: 'app-tipo-pedidos', component: TipoPedidosComponent, canActivate:[AuthGuard]},
  {path: 'app-localizacao', component: LocalizacaoComponent, canActivate:[AuthGuard]},
  {path: 'app-usuarios', component: UsuariosComponent, canActivate:[AuthGuard]},
  {path: 'app-filiais', component: FiliaisComponent, canActivate:[AuthGuard]},
  {path: 'app-home', component: HomeComponent, canActivate:[AuthGuard]},
  {path: 'app-cadastro-pedidos', component: CadastroPedidosComponent, canActivate:[AuthGuard]},
  {path: 'app-pedidos', component: PedidosComponent, canActivate:[AuthGuard]},
  {path: 'app-altera-senha', component: AlteraSenhaComponent, canActivate:[AuthGuard]},
  {path: 'app-header', component: HeaderComponent, canActivate:[AuthGuard]},
  {path: 'app-relatorio', component: RelatorioComponent, canActivate:[AuthGuard]},
  {path: '**', redirectTo: "app-login", pathMatch: "full"}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
