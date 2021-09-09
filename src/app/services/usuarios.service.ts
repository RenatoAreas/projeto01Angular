import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UsuariosService {

  private resource: string = "";

  //declarando e inicializando o componente HttpClient
  constructor(
    private httpClient: HttpClient
  ) {
    this.resource = environment.apiUrl + "/Account";
  }

  //função para cadastrar um usuario na API..
  register(data: any) {
    return this.httpClient.post(this.resource + "/Register", data);
  }

  //função para autenticar um usuario na API..
  login(data: any) {
    return this.httpClient.post(this.resource + "/Login", data);
  }

  //função para cadastrar um usuario na API..
  passwordRecover(data: any) {
    return this.httpClient.post(this.resource + "/PasswordRecover", data);
  }

  //função para retornar os dados do usuario autenticado na API..
  getUserData() {
    return this.httpClient.get(this.resource + "/UserData");
  }

  //função para atualizar a senha do usuario na API
  modifyPassword(data: any) {
    return this.httpClient.put(this.resource + "/ModifyPassword", data);
  }
}
