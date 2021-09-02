import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UsuariosService {

  //declarando e inicializando o componente HttpClient
  constructor(private httpClient: HttpClient) { }

  //função para cadastrar um usuario na API..
  register(data: any) {
    return this.httpClient.post(environment.apiUrl + "/Account/Register", data);
  }

  //função para autenticar um usuario na API..
  login(data: any) {
    return this.httpClient.post(environment.apiUrl + "/Account/Login", data);
  }

  //função para cadastrar um usuario na API..
  passwordRecover(data: any) {
    return this.httpClient.post(environment.apiUrl + "/Account/PasswordRecover", data);
  }

  //função para retornar os dados do usuario autenticado na API..
  getUserData() {
    return this.httpClient.get(environment.apiUrl + "/Account/UserData");
  }

  //função para atualizar a senha do usuario na API
  modifyPassword(data: any) {
    return this.httpClient.put(environment.apiUrl + "/Account/ModifyPassword", data);
  }
}
