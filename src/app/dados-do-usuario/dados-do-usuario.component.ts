import { Component, OnInit } from '@angular/core';
import { UsuariosService } from '../services/usuarios.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-dados-do-usuario',
  templateUrl: './dados-do-usuario.component.html',
  styleUrls: ['./dados-do-usuario.component.css']
})
export class DadosDoUsuarioComponent implements OnInit {

  usuario: any = {
    idUsuario: '',
    nome: '',
    email: '',
    dataCadastro: ''
  };

  //inicializando por meio de injeção de dependência
  constructor(private usuariosService: UsuariosService) { }

  //método executado ao abrir a página
  ngOnInit(): void {

    //consultando os dados do usuario na API..
    this.usuariosService.getUserData()
      .subscribe(
        (success) => {
          
          //armazenar no componente os dados obtidos do usuario
          this.usuario = success as any;

        },
        (e) => {
          console.log(e);
        }
      );
  }
}
