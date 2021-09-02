import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { UsuariosService } from './services/usuarios.service';
import { AuthenticationUtil } from './utils/authentication-util';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  //atributo utilizado para definir se o usuario
  //esta ou não autenticado na aplicação
  isLoggedIn = false;

  //atributo para exibir dados quando o usuaro autenticar no sistema:
  usuario_nome : string = "";
  usuario_email : string = "";

  //método construtor
  //inicializando o componente UsuariosService
  constructor(
    private usuariosService: UsuariosService,
    private authUtil: AuthenticationUtil
    ) { }

  formLogin = new FormGroup(
    {
      email: new FormControl('', [
        Validators.required, //campo obrigatório
        Validators.email, //formato de email        
      ]),
      senha: new FormControl('', [
        Validators.required, //campo obrigatório
        Validators.minLength(8), //mínimo de caracteres
        Validators.maxLength(25), //máximo de caracteres
      ])
    }
  );

  formRegister = new FormGroup(
    {
      nome: new FormControl('', [
        Validators.required, //campo obrigatório  
      ]),
      email: new FormControl('', [
        Validators.required, //campo obrigatório
        Validators.email, //formato de email        
      ]),
      senha: new FormControl('', [
        Validators.required, //campo obrigatório
        Validators.minLength(8), //mínimo de caracteres
        Validators.maxLength(25), //máximo de caracteres
      ]),
      senhaConfirmacao: new FormControl('', [
        Validators.required, //campo obrigatório
      ])
    }
  );

  formPasswordRecover = new FormGroup(
    {
      email: new FormControl('', [
        Validators.required, //campo obrigatório
        Validators.email, //formato de email        
      ])
    }
  );

  get loginForm(): any {
    return this.formLogin.controls;
  }

  get registerForm(): any {
    return this.formRegister.controls;
  }

  get passwordRecoverForm(): any {
    return this.formPasswordRecover.controls;
  }

  //método executado sempre que o componente for aberto
  ngOnInit(): void {

    //verificar se o usuario está autenticado
    if (this.authUtil.isAuthenticated()) {
      this.isLoggedIn = true; //usuario está autenticado!

      //ler o conteudo gravado na localstorage
      const dados = JSON.parse(localStorage.getItem('AUTHENTICATION') as string);

      //armazenar nos atributos
      this.usuario_nome = this.authUtil.getUserName();
      this.usuario_email = this.authUtil.getUserEmail();
    }
    else {
      this.isLoggedIn = false; //usuário não está autenticado!
    }

  }

  mensagemAcessoNegado: string = "";

  onLoginSubmit(): void {

    //executando o método para integração com a API
    this.usuariosService.login(this.formLogin.value)
      .subscribe(
        (success: any) => {

          //gravando os dados de autenticação obtidos da API
          this.authUtil.signIn(success);

          //recarregar a página..
          this.ngOnInit();
        },
        (e: any) => {
          this.mensagemAcessoNegado = "Acesso negado.";
        }
      );
  }

  //atributo para exibir mensagem na página
  mensagemSucessoCadastro: string = "";
  mensagemErroCadastro: string = "";

  //funçao para limpar as mensagens do formulario de cadastro
  limparMensagensCadastro(): void {
    this.mensagemSucessoCadastro = "";
    this.mensagemErroCadastro = "";
  }

  //função para cadastrar o usuario
  onRegisterSubmit(): void {

    this.limparMensagensCadastro();

    //executando uma chamada para a API
    this.usuariosService.register(this.formRegister.value)
      .subscribe( //captura o retorno (PROMISSE) da API

        //retorno de sucesso da API..
        (success: any) => { //imprimindo mensagem de sucesso
          this.mensagemSucessoCadastro = success.message;
          this.formRegister.reset();
        },

        //retorno de erro da API..
        (e: any) => { //imprimindo mensagem de erro

          switch (e.status) { //código do erro (400x, 500x, etc)

            case 400: //badrequest
              this.mensagemErroCadastro = e.error.errors.SenhaConfirmacao[0];
              break;

            case 422: //unprocessable entity
              this.mensagemErroCadastro = e.error;
              break;

            default: //nenhum dos anteriores
              this.mensagemErroCadastro = "Operação não pôde ser realizada, tente novamente,";
              break;
          }
        }
      );
  }

  onRegisterReset(): void {
    this.limparMensagensCadastro();
    this.formRegister.reset();
  }

  //mensagens de recuperação de senha
  mensagemSucessoRecuperarSenha: string = "";
  mensagemErroRecuperarSenha: string = "";

  //função para limpar as mensagens
  limparMensagensRecuperarSenha(): void {
    this.mensagemSucessoRecuperarSenha = "";
    this.mensagemErroRecuperarSenha = "";
  }

  onPasswordRecoverSubmit(): void {

    this.limparMensagensRecuperarSenha();

    //fazendo a integração com o serviço da API..
    this.usuariosService.passwordRecover(this.formPasswordRecover.value)
      .subscribe(
        (success: any) => {
          this.mensagemSucessoRecuperarSenha = success.message;
          this.formPasswordRecover.reset();
        },
        (e: any) => {
          switch (e.status) {
            case 422:
              this.mensagemErroRecuperarSenha = e.error;
              break;
            default:
              this.mensagemErroRecuperarSenha = "Operação não pôde ser realizada.";
              break;
          }
        }
      )
  }

  logout(): void {

    //apagar o conteudo da localstorage
    this.authUtil.signOut();

    //recarregar a página..
    window.location.href = "/";
  }

}
