import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { TarefasService } from '../services/tarefas.service';

@Component({
  selector: 'app-cadastro-tarefas',
  templateUrl: './cadastro-tarefas.component.html',
  styleUrls: ['./cadastro-tarefas.component.css']
})
export class CadastroTarefasComponent implements OnInit {

  //atributos (campos)
  message = "";

  //método construtor -> inicializar os serviços do componente, etc
  constructor(private tarefasService: TarefasService) { }

  //função executada antes do componente abrir na página
  ngOnInit(): void {
    //evento executado antes do carregamento do componente
  }

  //criando um objeto capaz de capturar todo 
  //o conteudo do formulário
  formCadastroTarefa = new FormGroup(
    {
      //capturando cada campo do formulário
      //NOME DA TAREFA (campo do formulário)
      nome: new FormControl('', [
        Validators.required, //campo obrigatório
        Validators.minLength(6), //mínimo de caracteres
        Validators.maxLength(150), //máximo de caracteres
      ]),
      //DATA DA TAREFA (campo do formulário)
      data: new FormControl('', [
        Validators.required, //campo obrigatório
      ]),
      //HORA DA TAREFA (campo do formulário)
      hora: new FormControl('', [
        Validators.required, //campo obrigatório
      ]),
      //DESCRIÇÃO DA TAREFA (campo do formulário)
      descricao: new FormControl('', [
        Validators.required, //campo obrigatório  
        Validators.minLength(6), //mínimo de caracteres
        Validators.maxLength(250), //máximo de caracteres  
      ]),
      //PRIORIDADE DA TAREFA (campo do formulário)
      prioridade: new FormControl('', [
        Validators.required, //campo obrigatório
      ]),
    }
  );

  //criando um objeto para seja possivel utilizar
  //o FormControl (formCadastroTarefa) na página HTML
  get form(): any {
    //permitir que possamos acessar o conteudo do
    //objeto 'formCadastroTarefa' na página HTML
    return this.formCadastroTarefa.controls;
  }

  //função para capturar o evento SUBMIT do formulário
  onSubmit(): void {

    //gravar os dados da tarefa em memória..
    this.tarefasService.addTarefa(this.formCadastroTarefa.value)

    //limpar os campos do formulário..
    this.formCadastroTarefa.reset();

    //mensagem de popup do navegador
    this.message = 'Tarefa cadastrada com sucesso!';
  }

  //função para limpar a mensagem
  clearMessage() : void {
    this.message = "";
  }

}
