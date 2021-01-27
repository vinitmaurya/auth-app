import { HttpInterceptor } from '@angular/common/http';
import { Injectable,Injector } from '@angular/core';
import {AuthService} from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class TokenInterceptorService implements HttpInterceptor{

  constructor(private injector:Injector) { }

  intercept(req,next){
    let authSerice = this.injector.get(AuthService)
    let tokenizedReq = req.clone(
      {
      headers: req.headers.set('Authorization','bearer'+authSerice.getToken())
      // setHeaders:{
      //   Authorization:`Bearer ${authSerice.getToken}`
      // }
      }
    )
    return next.handle(tokenizedReq)
  }
}
