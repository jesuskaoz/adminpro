import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { Usuario } from '../../models/usuario.model';
import { URL_SERVICIOS } from '../../config/config';
import { SubirArchivoService } from '../subir-archivo/subir-archivo.service';
import 'rxjs/add/operator/map';
import swal from 'sweetalert2';



@Injectable()
export class UsuarioService {

  usuario: Usuario;
  token: string;

  constructor(
    public router: Router,
    public http: HttpClient,
    public _archivoService: SubirArchivoService
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

  actualizarUsuario(_usuario: Usuario) {
    const url = URL_SERVICIOS + 'usuario/' + this.usuario._id;
    const headers = new HttpHeaders({
      'authorization': this.token
    });
    return this.http.put(url, _usuario, {headers: headers}).map((resp: any) => {
        if (_usuario._id === this.usuario._id) {
          this.usuario = resp.usuario;
          this.saveStorage(resp.usuarios._id, this.token, resp.usuarios );
        }
        swal('Usuario Actualizado', _usuario.nombre, 'success');
        return true;
    });
  }

  actualizarImagen(archivo: File, id: string) {

    this._archivoService.subirArchivo(archivo, 'usuarios', id)
        .then((resp: any) => {
          console.log(resp);
          this.usuario.img = resp.usuario.img;
          swal('Imagen Actualizada', this.usuario.nombre, 'success');
          this.saveStorage(id, this.token, this.usuario);

        }).catch(resp => {
          console.log(resp);
        });
  }

  cargarUsuarios(page: number = 0) {
    const url = URL_SERVICIOS + 'usuario?page=' + page;
    return this.http.get(url);
  }

  filtroUsuarios(filtro: string) {
    const url = URL_SERVICIOS + 'busqueda/coleccion/usuarios/' + filtro;
    return this.http.get(url).map( (resp: any) =>  resp.usuarios );
  }

  borrarUsuario(id: string) {
    const url = URL_SERVICIOS + 'usuario/' + id;
    const headers = new HttpHeaders({
      'authorization': this.token
    });
    return this.http.delete(url, {headers: headers})
               .map( (resp: any) =>  {
                  swal(
                    'Borrado!',
                    '¡El usuario ' + resp.usuarios.nombre + ' se ha eliminado',
                    'success'
                  );
                  return true;
                });
  }
}
