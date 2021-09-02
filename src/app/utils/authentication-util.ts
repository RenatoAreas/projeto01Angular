import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class AuthenticationUtil {

    key: string = "AUTHENTICATION";

    //Gravar os dados de autenticação na local storage
    signIn(data: any): void {
        localStorage.setItem(this.key, JSON.stringify(data));
    }

    //Apagar o conteúdo gravado na local storage
    signOut(): void {
        localStorage.removeItem(this.key);
        window.location.href = "/";
    }

    //Verificar se o usuário está autenticado
    isAuthenticated(): boolean {
        return localStorage.getItem(this.key) != null;
    }

    //Retornar o TOKEN
    getAccessToken(): string {
        var auth = JSON.parse(localStorage.getItem(this.key) as string);
        return auth.accessToken;
    }

    //Retornar o nome do usuário autenticado
    getUserName(): string {
        var auth = JSON.parse(localStorage.getItem(this.key) as string);
        return auth.usuario;
    }

    //Retornar o email do usuário autenticado
    getUserEmail(): string {
        var auth = JSON.parse(localStorage.getItem(this.key) as string);
        return auth.email;
    }
}