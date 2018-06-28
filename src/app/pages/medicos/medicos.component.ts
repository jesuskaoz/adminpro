import { Component, OnInit } from '@angular/core';
import { Medico } from '../../models/medico.model';
import { MedicoService } from '../../service/service.index';
import swal from 'sweetalert2';

@Component({
  selector: 'app-medicos',
  templateUrl: './medicos.component.html',
  styles: []
})
export class MedicosComponent implements OnInit {

  medicos: Medico[] = [];
  page: number = 0;
  totalRegistros: number = 0;
  cargarMed: boolean = true;

  constructor(
    public _medicoService: MedicoService
  ) { }

  ngOnInit() {
    this.cargarMedicos();
  }

  cargarMedicos() {
      this._medicoService.cargarMedicos(this.page)
      .subscribe((resp: any) => {
          this.totalRegistros = resp.contador;
          this.medicos = resp.medicos;
          this.cargarMed = false;
      }
      );
  }
  buscarMedico(busqueda: string) {
    if (busqueda.length <= 0) {
      this.cargarMedicos();
      return;
    }
    this.cargarMed = true;
    this._medicoService.buscarMedico(busqueda)
    .subscribe( (_medicos: Medico[]) => {
      this.medicos = _medicos;
      this.cargarMed = false;
    });
  }
  borrarMedico(_medico: Medico) {
    swal({
      title: '¿Estas seguro?',
      text: '¡Estas a punto de borrar a ' + _medico.nombre,
      type: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, ¡Borralo!'
    }).then((result) => {
      if (result.value) {
        this._medicoService.borrarMedico(_medico._id)
            .subscribe( (resp: boolean) => {
              this.cargarMedicos();
            });
      }
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
    this.cargarMedicos();
  }
}
