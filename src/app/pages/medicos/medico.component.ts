import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MedicoService, HospitalService } from '../../service/service.index';
import { Hospital } from '../../models/hospital.model';
import { Medico } from '../../models/medico.model';
import { Router, ActivatedRoute } from '@angular/router';
import { ModalUploadService } from '../../componets/modal-upload/modal-upload.service';


@Component({
  selector: 'app-medico',
  templateUrl: './medico.component.html',
  styles: []
})
export class MedicoComponent implements OnInit {

  hospitales: Hospital[] = [];
  medico: Medico = new Medico('', '', '', '', '');
  hospital: Hospital = new Hospital('');

  constructor(
    public _medicoService: MedicoService,
    public _hospitalService: HospitalService,
    public router: Router,
    public activatedRoute: ActivatedRoute,
    public _modalUpload: ModalUploadService
  ) {
    activatedRoute.params.subscribe(params => {
      let id = params['id'];
      if ( id !== 'nuevo') {
          this.cargarMedico(id);
      }
    });
   }

  ngOnInit() {
    this._hospitalService.cargarTodoHospitales()
        .subscribe((resp: any) => {
          this.hospitales = resp.hospitales;
        } );
    this._modalUpload.notificacion.subscribe(resp => this.medico.img = resp.medico.img);
  }
  cargarMedico(id: string) {
    this._medicoService.obtenerMedico(id).subscribe(medico => {
      this.medico = medico;
      this.medico.hospital = medico.hospital._id;
      this.cambiarHospital(medico.hospital);
    });
  }
  guardarMedico(form: NgForm) {
    if (form.invalid) {
      return;
    }
    this._medicoService.crearMedico(this.medico).subscribe(medico => {
        this.medico._id = medico._id;
        this.router.navigate(['/medico', medico._id]);
    });
  }

  cambiarHospital( id: string) {
      this._hospitalService.obtenerHospital(id).subscribe( hospital => this.hospital = hospital);
  }

  cambiarImagen() {
    this._modalUpload.mostrarModal('medicos', this.medico._id);
  }
}
