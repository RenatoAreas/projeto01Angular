import { NgModule } from "@angular/core";

import { PainelPrincipalComponent } from './painel-principal/painel-principal.component';
import { CadastroTarefasComponent } from './cadastro-tarefas/cadastro-tarefas.component';
import { ConsultaTarefasComponent } from './consulta-tarefas/consulta-tarefas.component';
import { DadosDoUsuarioComponent } from './dados-do-usuario/dados-do-usuario.component';
import { AlterarSenhaComponent } from './alterar-senha/alterar-senha.component';

//importando as classes para configurar a biblioteca de rotas do angular
import { Routes, RouterModule } from '@angular/router';

//para cada componente que iremos acessar no site, precisamos
//mapear um endereço de navegação (URL, ROTA)
const routes: Routes = [
    //para cada componente, iremos definir um PATH (caminho de url)
    { path: '', component: PainelPrincipalComponent },
    { path: 'cadastro-tarefas', component: CadastroTarefasComponent },
    { path: 'consulta-tarefas', component: ConsultaTarefasComponent },
    { path: 'dados-do-usuario', component: DadosDoUsuarioComponent },
    { path: 'alterar-senha', component: AlterarSenhaComponent }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})

export class AppRoutingModule { }