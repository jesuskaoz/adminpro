import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { UsuarioService } from '../usuario/usuario.service';

@Injectable()
export class LoginGardGuard implements CanActivate {

  constructor(
    public _usuarioService: UsuarioService,
    public router: Router
  ) {}

  canActivate() {
    if (this._usuarioService.loginStatus()) {
      // console.log('Estatus: autentificado');
      return true;
    } else {
      // console.log('Estatus: sin autentificar');
      this.router.navigate(['/login']);
      return false;
    }
  }
}
