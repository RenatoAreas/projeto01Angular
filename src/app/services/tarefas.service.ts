import { Injectable } from '@angular/core';
import { Tarefa } from '../models/tarefa.model';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class TarefasService {

  private resource: string = "";

  constructor(
    private httpClient: HttpClient
  ) {
    this.resource = environment.apiUrl + "/Tarefas";
  }

  addTarefa(item: Tarefa) {
    return this.httpClient.post(this.resource, item);
  }

  delete(item: Tarefa) {
    return this.httpClient.delete(this.resource + "/" + item.idTarefa);
  }

  update(item: Tarefa) {
    return this.httpClient.put(this.resource, item);
  }

  getTarefas() {
    return this.httpClient.get(this.resource);
  }

  getTarefaById(idTarefa: string) {
    return this.httpClient.get(this.resource + "/" + idTarefa);
  }
}
