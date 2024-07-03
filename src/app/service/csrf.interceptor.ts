import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable()
export class CsrfInterceptor implements HttpInterceptor {

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const csrfToken = this.getCookie('XSRF-TOKEN');  // This should match the CSRF token name
    const backendApiUrl = `${environment.backendApi}`; 
    if (csrfToken && req.url.startsWith(backendApiUrl)) {
      const cloned = req.clone({
        headers: req.headers.set('X-XSRF-TOKEN', csrfToken)  // This should match the CSRF header name
      });
      return next.handle(cloned);
    } else {
      return next.handle(req);
    }
  }

  private getCookie(name: string): string | null {
    const nameEQ = name + "=";
    const ca = document.cookie.split(';');
    for (let i = 0; i < ca.length; i++) {
      let c = ca[i];
      while (c.charAt(0) === ' ') c = c.substring(1, c.length);
      if (c.indexOf(nameEQ) === 0) return c.substring(nameEQ.length, c.length);
    }
    return null;
  }
}
