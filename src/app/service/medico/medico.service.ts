import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { SubirArchivoService } from '../subir-archivo/subir-archivo.service';
import { UsuarioService } from '../usuario/usuario.service';
import { URL_SERVICIOS } from '../../config/config';
import 'rxjs/add/operator/map';
import swal from 'sweetalert2';
import { Medico } from '../../models/medico.model';

@Injectable()
export class MedicoService {

  constructor(
    public router: Router,
    public http: HttpClient,
    public _archivoService: SubirArchivoService,
    public _usuarioService: UsuarioService
  ) { }

  cargarMedicos(page: number = 0) {
    const url = URL_SERVICIOS + 'medico?page=' + page;
    return this.http.get(url);
  }

  buscarMedico(	termino:	string ) {
    const url = URL_SERVICIOS + 'busqueda/coleccion/medicos/' + termino;
    return this.http.get(url).map( (resp: any) =>  resp.medicos );
  }

  borrarMedico(	id:	string	) {
    const url = URL_SERVICIOS + 'medico/' + id;
    const headers = new HttpHeaders({
      'authorization': this._usuarioService.token
    });
    return this.http.delete(url, {headers: headers})
               .map( (resp: any) =>  {
                  swal(
                    'Borrado!',
                    '¡El Medico ' + resp.medico.nombre + ' se ha eliminado',
                    'success'
                  );
                  return true;
                });
  }
  crearMedico(medico: Medico) {

    let url = URL_SERVICIOS + 'medico';

    if (medico._id) {
      url += '/' + medico._id;
      const headers = new HttpHeaders({
        'authorization': this._usuarioService.token
      });
      return this.http.put(url, medico, {headers: headers}).map( (resp: any) => {
        swal('Medico actualizado', resp.medico.nombre, 'success');
        return resp.medico;
      });
    } else {
      const headers = new HttpHeaders({
        'authorization': this._usuarioService.token
      });
      return this.http.post(url, medico, {headers: headers}).map( (resp: any) => {
        swal('Medico Creado', resp.medico.nombre, 'success');
        return resp.medico;
      });
    }
  }
  obtenerMedico(	id:	string ) {
    const url = URL_SERVICIOS + 'medico/' + id;
    return this.http.get(url)
               .map((resp: any) => resp.medico);
  }

}
