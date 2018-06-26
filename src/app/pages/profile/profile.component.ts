import { Component, OnInit } from '@angular/core';
import { Usuario } from '../../models/usuario.model';
import { UsuarioService } from '../../service/service.index';
import swal from 'sweetalert2';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styles: []
})
export class ProfileComponent implements OnInit {
  usuario: Usuario;
  imagenSubir: File;
  imagenTemp: string;
  constructor(public _userService: UsuarioService) {
    this.usuario = this._userService.usuario;
   }

  ngOnInit() {
  }

  guardar(usuario: Usuario) {
    this.usuario.nombre = usuario.nombre;
    if (!this.usuario.google) {
      this.usuario.email = usuario.email;
    }

    this._userService.actualizarUsuario(usuario).subscribe();
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
    // let urlImagenTemp = reader.readAsDataURL(archivo);

    reader.onload = () => this.imagenTemp = reader.result;
  }

  cambiarImagen() {
    this._userService.actualizarImagen(this.imagenSubir, this.usuario._id);
  }
}
