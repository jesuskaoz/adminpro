import { Component, OnInit } from '@angular/core';
import { Usuario } from '../../models/usuario.model';
import { UsuarioService } from '../../service/service.index';
import { ModalUploadService } from '../../componets/modal-upload/modal-upload.service';
import swal from 'sweetalert2';


@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styles: []
})
export class UsuariosComponent implements OnInit {

  usuarios: Usuario[] = [];
  page: number = 0;
  totalRegistros: number = 0;
  cargarUsers: boolean = true;

  constructor(
    public _usuarioService: UsuarioService,
    public _modalUploadService: ModalUploadService
  ) { }

  ngOnInit() {
    this.cargarUsuarios();
    this._modalUploadService.notificacion.subscribe(resp => this.cargarUsuarios());
  }

  cargarUsuarios() {
    this.cargarUsers = true;
    this._usuarioService.cargarUsuarios(this.page)
        .subscribe((resp: any) => {
            this.totalRegistros = resp.total;
            this.usuarios = resp.usuarios;
            this.cargarUsers = false;
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
    this.cargarUsuarios();
  }
  buscarUsuario(busqueda: string) {
    if (busqueda.length <= 0) {
      this.cargarUsuarios();
      return;
    }
    this.cargarUsers = true;
    this._usuarioService.filtroUsuarios(busqueda)
    .subscribe( (usuarios: Usuario[]) => {
      this.usuarios = usuarios;
      this.cargarUsers = false;
    });
  }
  borrarUsuario(usuario: Usuario) {
    if (usuario._id === this._usuarioService.usuario._id) {
        swal('No se puede borrar usuario!', '¡No puede borrarse a si mismo!', 'error');
        return;
    }

    swal({
      title: '¿Estas seguro?',
      text: '¡Estas a punto de borrar a ' + usuario.nombre,
      type: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, ¡Borralo!'
    }).then((result) => {
      if (result.value) {
        this._usuarioService.borrarUsuario(usuario._id)
            .subscribe( (resp: boolean) => {
              this.cargarUsuarios();
            });
      }
    });
  }

  guardarUsuario(usuario: Usuario) {
    this._usuarioService.actualizarUsuario(usuario)
        .subscribe(resp => {
        });
  }

  mostrarModal(id: string) {
    this._modalUploadService.mostrarModal('usuarios', id);
  }

}
