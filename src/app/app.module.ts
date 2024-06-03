import { BrowserModule } from '@angular/platform-browser';
import { NgModule, ErrorHandler } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {CarouselModule} from 'primeng/carousel';
import {ButtonModule} from 'primeng/button';
import {ToastModule} from 'primeng/toast';
import {TableModule} from 'primeng/table';
import {ConfirmDialogModule} from 'primeng/confirmdialog';
import { MessagesModule } from 'primeng/messages';
import {DialogModule} from 'primeng/dialog';
import {SidebarModule} from 'primeng/sidebar';
import {DynamicDialogModule} from 'primeng/dynamicdialog';
import {MultiSelectModule} from 'primeng/multiselect';
import {DropdownModule} from 'primeng/dropdown';
import {CalendarModule} from 'primeng/calendar';
import {InputTextModule} from 'primeng/inputtext';
import {OrderListModule} from 'primeng/orderlist';
import {ProgressSpinnerModule} from 'primeng/progressspinner';
import {PickListModule} from 'primeng/picklist';
import { CardModule } from 'primeng/card';
import {SelectButtonModule} from 'primeng/selectbutton';
import {ToggleButtonModule} from 'primeng/togglebutton';
import {MessageModule} from 'primeng/message';
import {CheckboxModule} from 'primeng/checkbox';
import {PasswordModule} from 'primeng/password';
import {TriStateCheckboxModule} from 'primeng/tristatecheckbox';
import { NgxMaskModule } from 'ngx-mask';
import { AppRoutingModule } from './app-routing.module';
import { MenuModule } from 'primeng/menu';
import { MenubarModule } from 'primeng/menubar';

import { AlteraSenhaComponent } from './components/altera-senha/altera-senha.component';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { MenuComponent } from './components/menu/menu.component';
import { FooterComponent } from './components/footer/footer.component';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/security/login/login.component';
import { FiliaisComponent } from './components/filiais/filiais.component';
import { ModalidadeEntregaComponent } from './components/modalidade-entrega/modalidade-entrega.component';
import { PerfilComponent } from './components/perfil/perfil.component';
import { StatusPedidosComponent } from './components/status-pedidos/status-pedidos.component';
import { LocalizacaoComponent } from './components/localizacao/localizacao.component';
import { TipoPedidosComponent } from './components/tipo-pedidos/tipo-pedidos.component';
import { UsuariosComponent } from './components/usuarios/usuarios.component';
import { PedidosComponent } from './components/home/pedidos/pedidos.component';
import { ModalFiltroComponent } from './components/modal-filtro/modal-filtro.component';
import { CadastroPedidosComponent } from './components/home/cadastro-pedidos/cadastro-pedidos.component';

import { AuthInterceptorProvider } from './interceptors/auth-interceptor';
import { ErrorInterceptorProvider } from './interceptors/error-interceptor';
import { ServicoPedido } from './services/servico-pedido';
import { RelatorioComponent } from './components/relatorio/relatorio.component'

import { UserService } from './services/user.service';
import { FilialService } from './services/filial.service';
import { PerfilService } from './services/perfil-service';
import { PedidoService } from './services/pedido-service';
import { ConfirmationService } from 'primeng/api';
import { DataSharingService } from './services/data-sharing.service';
import { AuthService } from './services/auth.service';
import { StorageService } from './services/storage.service';
import { SharedService } from './services/shared.service';

import { routes } from './app.routes';
import { AuthGuard } from './services/auth.guard';

@NgModule({
  imports: [
    NgxMaskModule.forRoot(),
    BrowserModule,
    BrowserAnimationsModule,
    CarouselModule,
    ButtonModule,
    ToastModule,
    TableModule,
    FormsModule,
    MessagesModule,
    HttpClientModule,
    AppRoutingModule,
    ConfirmDialogModule,
    ReactiveFormsModule,
    DialogModule,
    SidebarModule,
    DynamicDialogModule,
    MultiSelectModule,
    DropdownModule,
    CalendarModule,
    InputTextModule,
    OrderListModule,
    ProgressSpinnerModule,
    PickListModule,
    CardModule,
    SelectButtonModule,
    ToggleButtonModule,
    MessageModule,
    CheckboxModule,
    PasswordModule,
    TriStateCheckboxModule,
    MenuModule,
    MenubarModule,
    routes],
  declarations: [
    AppComponent,
    HeaderComponent,
    MenuComponent,
    FooterComponent,
    HomeComponent,
    LoginComponent,
    ModalidadeEntregaComponent,
    PerfilComponent,
    StatusPedidosComponent,
    LocalizacaoComponent,
    TipoPedidosComponent,
    UsuariosComponent,
    PedidosComponent,
    ModalFiltroComponent,
    CadastroPedidosComponent,
    AlteraSenhaComponent,
    FiliaisComponent,
    RelatorioComponent
  ],
  providers: [
    SharedService,
    UserService,
    FilialService,
    PerfilService,
    PedidoService,
    StorageService,
    AuthService,
    ServicoPedido,
    ConfirmationService,
    AuthGuard,
    DataSharingService,
    AuthInterceptorProvider,
    ErrorInterceptorProvider],
  bootstrap: [AppComponent]
})
export class AppModule { }
