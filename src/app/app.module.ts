import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { PainelPrincipalComponent } from './painel-principal/painel-principal.component';
import { CadastroTarefasComponent } from './cadastro-tarefas/cadastro-tarefas.component';
import { ConsultaTarefasComponent } from './consulta-tarefas/consulta-tarefas.component';
import { DadosDoUsuarioComponent } from './dados-do-usuario/dados-do-usuario.component';
import { AlterarSenhaComponent } from './alterar-senha/alterar-senha.component';

//importando a biblioteca de gráficos
import { ChartModule } from 'angular-highcharts';

//importando a biblioteca para paginação de dados
import { NgxPaginationModule } from 'ngx-pagination';

//importando a biblioteca para filtros de busca
import { Ng2SearchPipeModule } from 'ng2-search-filter';

//importando as bibliotecas do Angular para desenvolvimento de formulários
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

//importando o modulo de configuração de rotas criado no projeto
import { AppRoutingModule } from './app.routing';

//importando o modulo para acesso aos métodos das APIs
import { HttpClientModule } from '@angular/common/http';

//importando o interceptor
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { TokenInterceptor } from './interceptors/TokenInterceptor';

@NgModule({
  declarations: [
    AppComponent,
    PainelPrincipalComponent,
    CadastroTarefasComponent,
    ConsultaTarefasComponent,
    DadosDoUsuarioComponent,
    AlterarSenhaComponent
  ],
  imports: [
    BrowserModule, //registrando as rotas mapeadas
    AppRoutingModule, //configuração de rotas
    FormsModule, //registrando a biblioteca de formularios
    ReactiveFormsModule, //registrando a biblioteca de formularios
    NgxPaginationModule, //registrando a bilbioteca de paginação
    Ng2SearchPipeModule, //registrando a biblioteca de filtros de busca
    ChartModule, //registrando a biblioteca de gráficos
    HttpClientModule //registrando o módulo para acesso de APIs
  ],
  providers: [
    {
      //Configurando o uso do interceptor
      provide: HTTP_INTERCEPTORS,
      useClass : TokenInterceptor,
      multi : true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
