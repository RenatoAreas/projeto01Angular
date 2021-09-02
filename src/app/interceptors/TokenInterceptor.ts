import { Injectable } from "@angular/core";
import { AuthenticationUtil } from "../utils/authentication-util";
import {
    HttpRequest,
    HttpHandler,
    HttpEvent,
    HttpInterceptor
} from '@angular/common/http';
import { Observable } from "rxjs";

@Injectable()
export class TokenInterceptor implements HttpInterceptor {

    constructor(
        private authUtil: AuthenticationUtil
    ) { }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

        //colocar as chamadas da API que não precisam de TOKEN
        //para todas as demais, o Angular irá enviar o token de autorização
        if (!request.url.includes('/Account/Login')
            && !request.url.includes('/Account/Register')
            && !request.url.includes('/Account/PasswordRecover')) {

            //enviando o TOKEN para a API
            request = request.clone({
                setHeaders: { Authorization: 'Bearer ' + this.authUtil.getAccessToken() }
            });
        }

        return next.handle(request);
    }
}