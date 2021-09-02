import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Tarefa } from '../models/tarefa.model';
import { TarefasService } from '../services/tarefas.service';

@Component({
  selector: 'app-consulta-tarefas',
  templateUrl: './consulta-tarefas.component.html',
  styleUrls: ['./consulta-tarefas.component.css']
})
export class ConsultaTarefasComponent implements OnInit {

  //atributo para exibir mensagem
  message = "";

  //atributo para armazenar o filtro de busca
  //informado pelo usuario na página
  filtro = "";

  //atributo para armazenar o numero da página
  //que o usuario estiver navegando na paginação
  page = 1;

  //método construtor utilizado para inicializar 
  //os serviços que o componente precisa
  constructor(private tarefasService: TarefasService) { }

  //variavel para capturar todas as
  //tarefas obtidas pelo service que
  //estão gravadas em memória
  dados: Tarefa[] = [];

  //variavel para capturar os dados
  //de 1 tarefa selecionada para exclusão ou edição
  item: Tarefa = {
    idTarefa: -1, nome: '', data: '', hora: '', descricao: '', prioridade: ''
  };

  //evento executado antes que o componente abra..
  ngOnInit(): void {
    //trazer todas as tarefas que estão gravadas em memória
    this.dados = this.tarefasService.getTarefas();
  }

  //formulário de edição de tarefa
  formEdicaoTarefa = new FormGroup(
    {
      idTarefa: new FormControl('', []),
      nome: new FormControl('', [
        Validators.required,
        Validators.minLength(6),
        Validators.maxLength(150),
      ]),
      data: new FormControl('', [
        Validators.required,
      ]),
      hora: new FormControl('', [
        Validators.required,
      ]),
      descricao: new FormControl('', [
        Validators.required,
        Validators.minLength(6),
        Validators.maxLength(250),
      ]),
      prioridade: new FormControl('', [
        Validators.required,
      ]),
    }
  );

  get form(): any {
    return this.formEdicaoTarefa.controls;
  }

  //função para obter os dados da tarefa selecionada..
  obterTarefa(idTarefa: number, opcao?: string): void {

    //buscar os dados da tarefa atraves do ID..
    this.item = this.tarefasService.getTarefaById(idTarefa);

    //se a opção for editar, iremos preencher um formulario..
    if (opcao === 'EDITAR') {

      //preencher os campos do formulário
      this.formEdicaoTarefa.controls.idTarefa.setValue(this.item.idTarefa);
      this.formEdicaoTarefa.controls.nome.setValue(this.item.nome);
      this.formEdicaoTarefa.controls.data.setValue(this.item.data);
      this.formEdicaoTarefa.controls.hora.setValue(this.item.hora);
      this.formEdicaoTarefa.controls.descricao.setValue(this.item.descricao);
      this.formEdicaoTarefa.controls.prioridade.setValue(this.item.prioridade);

      this.message = "";
    }
  }

  //função para confirmar a atualização dos dados da tarefa
  confirmarAtualizacao(): void {

    //atualizar a tarefa com os dados preenchidos no formulário
    this.tarefasService.update(this.formEdicaoTarefa.value);

    //recarregar a consulta
    this.ngOnInit();

    //exibir mensagem de sucesso
    this.message = "Tarefa atualizada com sucesso.";
  }

  //função para excluir uma tareda..
  confirmarExclusao(): void {
    //excluindo a tarefa selecionada..
    this.tarefasService.delete(this.item);
    //executar novamente a consulta
    this.ngOnInit();
  }

  //função para realizar a paginaçao
  handlePageChange(event: any): void {
    this.page = event;
  }

}
