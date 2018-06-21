import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Usuario } from '../../models/usuario.model';
import { URL_SERVICIOS } from '../../config/config';
import 'rxjs/add/operator/map';
import swal from 'sweetalert2';


@Injectable()
export class UsuarioService {

  usuario: Usuario;
  token: string;

  constructor(
    public router: Router,
    public http: HttpClient
  ) {
    // console.log('Funcionado');
    this.loadStorage();
  }

  loginStatus()  {
    return (this.token.length > 5) ? true : false;
  }

  loadStorage() {
    if (localStorage.getItem('token')) {
      this.token = localStorage.getItem('token');
      this.usuario = JSON.parse(localStorage.getItem('usuario'));
    } else {
      this.token = '';
      this.usuario = null;
    }
  }
  saveStorage(id: string, token: string, usuario: Usuario) {
    localStorage.setItem('id', id);
    localStorage.setItem('token', token);
    localStorage.setItem('usuario', JSON.stringify(usuario));
    this.usuario = usuario;
    this.token = token;
  }

  logOut() {
    this.token = '';
    this.usuario = null;
    localStorage.removeItem('id');
    localStorage.removeItem('token');
    localStorage.removeItem('usuario');
    this.router.navigate(['/login']);
  }
  loginGoogle( token: string ) {
    const url = URL_SERVICIOS + 'login/google';
    return this.http.post(url, { token }).map((resp: any) => {
      this.saveStorage(resp.id, resp.token, resp.usuario);
      return true;
    });
  }

  login(usuario: Usuario, recuerdame: boolean = false) {
    if (recuerdame) {
      localStorage.setItem('email', usuario.email);
    } else {
      localStorage.removeItem('email');
    }
    const url = URL_SERVICIOS + 'login';
    return this.http.post(url, usuario).map((resp: any) => {
        this.saveStorage(resp.id, resp.token, resp.usuario);
        return true;
    });
  }
  crearUsuario(_usuario: Usuario) {
    const url = URL_SERVICIOS + 'usuario';
    return this.http.post(url, _usuario).map( (resp: any) => {
      swal('Usuario Creado', _usuario.email, 'success');
      return resp._usuario;
    });
  }
}
