import { Component, OnInit } from '@angular/core';
import { Hospital } from '../../models/hospital.model';
import { HospitalService } from '../../service/service.index';
import { ModalUploadService } from '../../componets/modal-upload/modal-upload.service';
import swal from 'sweetalert2';

@Component({
  selector: 'app-hospitales',
  templateUrl: './hospitales.component.html',
  styles: []
})
export class HospitalesComponent implements OnInit {

  hospital: Hospital[] = [];
  page: number = 0;
  totalRegistros: number = 0;
  cargarHosp: boolean = true;

  constructor(
    public _hospitalService: HospitalService,
    public _modalUploadService: ModalUploadService
  ) { }

  ngOnInit() {
    this.cargarHospitales();
  }

  cargarHospitales() {
    this.cargarHosp = true;
    this._hospitalService.cargarHospitales(this.page)
        .subscribe((resp: any) => {
            this.totalRegistros = resp.contador;
            this.hospital = resp.hospitales;
            this.cargarHosp = false;
        });
  }
  paginacion( valor: number) {
    const desde = this.page + valor;
    if (desde >= this.totalRegistros) {
      return;
    }
    if (desde < 0) {
      return;
    }
    this.page += valor;
    this.cargarHospitales();
  }

  buscarHospital(busqueda: string) {
    if (busqueda.length <= 0) {
      this.cargarHospitales();
      return;
    }
    this.cargarHosp = true;
    this._hospitalService.buscarHospital(busqueda)
    .subscribe( (_hospital: Hospital[]) => {
      this.hospital = _hospital;
      this.cargarHosp = false;
    });
  }

  borrarHospital(hospital: Hospital) {

    swal({
      title: '¿Estas seguro?',
      text: '¡Estas a punto de borrar a ' + hospital.nombre,
      type: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, ¡Borralo!'
    }).then((result) => {
      if (result.value) {
        this._hospitalService.borrarHospital(hospital._id)
            .subscribe( (resp: boolean) => {
              this.cargarHospitales();
            });
      }
    });
  }


  mostrarModal(id: string) {
    this._modalUploadService.mostrarModal('hospitales', id);
  }

  async modalGuardar() {
    const {value: nombre} = await swal({
      title: 'Crear nuevo hospital',
      input: 'text',
      inputPlaceholder: 'Ingresa el nombre del hospital',
      showCancelButton: true,
      inputValidator: (value) => {
        return !value && '¡Campo Obligatorio!';
      }
    });

    if (nombre) {
      this._hospitalService.crearHospital(nombre)
      .subscribe(resp => this.cargarHospitales());
    }
  }

  actualizarHospital(hosp: Hospital) {
    this._hospitalService.actualizarHospital(hosp).subscribe(resp => this.cargarHospitales());
  }
}
