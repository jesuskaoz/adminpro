import { Component, OnInit } from '@angular/core';
import swal from 'sweetalert2';
import { SubirArchivoService } from '../../service/service.index';
import { ModalUploadService } from './modal-upload.service';

@Component({
  selector: 'app-modal-upload',
  templateUrl: './modal-upload.component.html',
  styles: []
})
export class ModalUploadComponent implements OnInit {

  imagenSubir: File;
  imagenTemp: string;

  constructor(
    public _archivoService: SubirArchivoService,
    public _modalUploadService: ModalUploadService
  ) { }

  ngOnInit() {
  }

  cerrarModal() {
    this.imagenSubir = null;
    this.imagenTemp = null;
    this._modalUploadService.ocultarModal();
  }
  preViewImg(archivo: File) {
    if (!archivo) {
      this.imagenSubir = null;
      return;
    }
    if (archivo.type.indexOf('image') < 0) {
      this.imagenSubir = null;
      swal('¡Solo Imagenes!', '¡El archivo seleccionado no es una imagen!', 'error');
      return;
    }
    this.imagenSubir = archivo;
    const reader = new FileReader();
    const urlImagenTemp = reader.readAsDataURL(archivo);

    reader.onload = () => this.imagenTemp = reader.result;
  }

  subirImagen() {
    this._archivoService.subirArchivo(this.imagenSubir, this._modalUploadService.tipo, this._modalUploadService.id)
        .then( resp => {
          this._modalUploadService.notificacion.emit(resp);
          this.cerrarModal();
        })
        .catch(resp => {
          console.log('Error al cargar imagen...');
        });
  }

}
