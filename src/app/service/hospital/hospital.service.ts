import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { Hospital } from '../../models/hospital.model';
import { URL_SERVICIOS } from '../../config/config';
import { SubirArchivoService } from '../subir-archivo/subir-archivo.service';
import { UsuarioService } from '../usuario/usuario.service';
import 'rxjs/add/operator/map';
import swal from 'sweetalert2';



@Injectable()
export class HospitalService {

  hospital: Hospital;
  constructor(
    public router: Router,
    public http: HttpClient,
    public _archivoService: SubirArchivoService,
    public _usuarioService: UsuarioService
  ) { }

  cargarHospitales(page: number = 0) {
    const url = URL_SERVICIOS + 'hospital?page=' + page;
    return this.http.get(url);
  }

  cargarTodoHospitales() {
    const url = URL_SERVICIOS + 'hospital/all';
    return this.http.get(url);
  }
  obtenerHospital(	id:	string ) {
    const url = URL_SERVICIOS + 'hospital/' + id;
    return this.http.get(url)
               .map((resp: any) => resp.hospital);
  }

  crearHospital(nombre: string) {
    const url = URL_SERVICIOS + 'hospital';
    const headers = new HttpHeaders({
      'authorization': this._usuarioService.token
    });
    return this.http.post(url, { nombre: nombre }, {headers: headers}).map( (resp: any) => {
      swal('Hospital Creado', resp.hospital.nombre, 'success');
      return resp.hospital;
    });
  }

  buscarHospital(	termino:	string ) {
    const url = URL_SERVICIOS + 'busqueda/coleccion/hospitales/' + termino;
    return this.http.get(url).map( (resp: any) =>  resp.hospitales );
  }

  actualizarHospital(	hospital:	Hospital	) {
    const url = URL_SERVICIOS + 'hospital/' + hospital._id;
    const headers = new HttpHeaders({
      'authorization': this._usuarioService.token
    });
    return this.http.put(url, hospital, {headers: headers}).map((resp: any) => {
        swal('Hospital Actualizado', hospital.nombre, 'success');
        return true;
    });
  }

  borrarHospital(	id:	string	) {
    const url = URL_SERVICIOS + 'hospital/' + id;
    const headers = new HttpHeaders({
      'authorization': this._usuarioService.token
    });
    return this.http.delete(url, {headers: headers})
               .map( (resp: any) =>  {
                  swal(
                    'Borrado!',
                    '¡El hospital ' + resp.hospital.nombre + ' se ha eliminado',
                    'success'
                  );
                  return true;
                });
  }

}
