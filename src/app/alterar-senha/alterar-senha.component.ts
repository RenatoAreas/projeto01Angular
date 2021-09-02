import { Component, OnInit } from '@angular/core';
import { UsuariosService } from '../services/usuarios.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthenticationUtil } from '../utils/authentication-util';

@Component({
  selector: 'app-alterar-senha',
  templateUrl: './alterar-senha.component.html',
  styleUrls: ['./alterar-senha.component.css']
})
export class AlterarSenhaComponent implements OnInit {

  mensagem: string = "";

  constructor(
    private usuariosService: UsuariosService,
    private authUtil: AuthenticationUtil) { }

  formPasswordRecover = new FormGroup({
    senha: new FormControl('', [
      Validators.required
    ]),

    senhaConfirmacao: new FormControl('', [
      Validators.required
    ]),

    senhaNova: new FormControl('', [
      Validators.required
    ]),
  });

  get form(): any{
    return this.formPasswordRecover.controls;
  }
  ngOnInit(): void {
  }

  onSubmit(): void{
    this.usuariosService.modifyPassword(this.formPasswordRecover.value)
      .subscribe(
        (success:any) => {
          this.mensagem = success.message;
          this.formPasswordRecover.reset();

          if(confirm('Deseja sair do sistema e acessar com a sua nova senha ?')){
            this.authUtil.signOut();
          }
        },
        (e) => {

            console.log(e);

          switch(e.status){

            case 400:
            this.mensagem = e.error.errors.SenhaConfirmacao[0]
            break;
            case 422:
              this.mensagem = e.error;
              break;
          }
        }
      )
  }

}
