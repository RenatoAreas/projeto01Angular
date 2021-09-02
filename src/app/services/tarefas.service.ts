import { Injectable } from '@angular/core';
import { Tarefa } from '../models/tarefa.model';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class TarefasService {

  /*
  constructor(
    private httpCliente: HttpClient
  ){}

  addTarefa(item: Tarefa){
    this.httpCliente.post(environment.apiUrl + "/Tarefas", item)
  }

  delete(item: Tarefa){
    this.httpCliente.delete(environment.apiUrl + "/Tarefas" + item.idTarefa)
  }

  update(item: Tarefa){
    this.httpCliente.put(environment.apiUrl + "/Tarefas", item)
  }

  getTarefa(item: Tarefa) {
    this.httpCliente.get(environment.apiUrl)
  }

  getTarefaById(idTarefa: number){
    this.httpCliente.get(environment.apiUrl + "/" + idTarefa);
  }*/

  //guardar uma lista de tarefas em memória
  tarefas: Tarefa[] = [
    {
      idTarefa: 0,
      nome: 'Aula de Java WebDeveloper',
      data: '2021-08-10',
      hora: '18:00',
      descricao: 'Aula de Programação Orientada a Objetos',
      prioridade: '1'
    },
    {
      idTarefa: 1,
      nome: 'Aula de Angular',
      data: '2021-08-10',
      hora: '11:00',
      descricao: 'Aula de Programação FrontEnd',
      prioridade: '2'
    },
    {
      idTarefa: 2,
      nome: 'Aula de C# WebDeveloper',
      data: '2021-08-11',
      hora: '18:00',
      descricao: 'Aula de desenvolvimento de APIs',
      prioridade: '3'
    },
    {
      idTarefa: 3,
      nome: 'Aula de REACTJS',
      data: '2021-08-13',
      hora: '10:00',
      descricao: 'Aula de desenvolvimento Mobile',
      prioridade: '2'
    }
  ]; //inicializando como um array (lista)

  constructor() { }

  //criando uma função para capturar uma tarefa vinda da página
  //de cadastro e adiciona-la na lista que está em memória
  addTarefa(item: Tarefa): void {

    //obtendo a quantidade de tarefas cadastradas
    const itemIndex = this.tarefas.length;

    //gerando um id para a tarefa nova
    item.idTarefa = this.getNextId();

    //adicionar a tarefa no final da lista
    this.tarefas[itemIndex] = item;
  }

  //criando uma função para excluir uma tarefa
  delete(item: Tarefa) {

    //excluindo a tarefa da lista
    this.tarefas.splice(this.tarefas.indexOf(item), 1);
  }

  //criando uma função para atualizar uma tarefa
  update(item: Tarefa) {

    //procurar na lista a tarefa que possui o id enviado para edição
    const itemIndex = this.tarefas.findIndex(t => t.idTarefa === item.idTarefa);

    //substituir (atualizar) a tarefa na lista
    this.tarefas[itemIndex] = item;
  }

  //criando uma função que retorne todo o conteudo
  //da lista de tarefas que está em memória
  getTarefas(): Tarefa[] {

    //retornando todas as tarefas da lista
    return this.tarefas;
  }

  //criando uma função para retornar 1 tarefa pelo id
  getTarefaById(idTarefa : number) : Tarefa {

    //procurar na lista a tarefa atraves do ID
    const itemIndex = this.tarefas.findIndex(t => t.idTarefa === idTarefa);

    //retornar os dados da tarefa
    return this.tarefas[itemIndex];
  }

  //criando uma função para incrementar o ID da tarefa
  //ou seja, gerar um novo ID para o cadastro de uma tarefa
  getNextId(): number {
    let maior = 0;
    this.tarefas.forEach(
      function (item) {
        if (maior === 0) {
          maior = item.idTarefa;
        }
        if (maior < item.idTarefa) {
          maior = item.idTarefa;
        }
      }
    );

    return maior + 1;
  }
}
