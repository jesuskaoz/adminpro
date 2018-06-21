import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { UsuarioService } from '../service/service.index';
import { Usuario } from '../models/usuario.model';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';

declare function  init_plugins();

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./login.component.css']
})
export class RegisterComponent implements OnInit {

  frmRegistro: FormGroup;

  constructor(
    public _usuarioService: UsuarioService,
    public router: Router
  ) { }

  sonIguales(val1: string, val2: string) {
    return (group: FormGroup) => {
      let param = group.controls[val1].value;
      let param2 = group.controls[val2].value;
      if (param === param2) {
        return null;
      }
      return {
        sonIguales: true
      };
    };
  }

  ngOnInit() {
    init_plugins();
    this.frmRegistro = new FormGroup({
      nombre: new FormControl(null, Validators.required),
      correo: new FormControl(null, [Validators.required, Validators.email]),
      password: new FormControl(null, Validators.required),
      password2: new FormControl(null, Validators.required),
      condiciones: new FormControl(false)
    }, {validators: this.sonIguales('password', 'password2')} );

    this.frmRegistro.setValue({
      nombre: 'test 1 ',
      correo: 'test1@test.com',
      password: '123',
      password2: '123',
      condiciones: true
    });
  }
  registrarUsuario() {
    if (this.frmRegistro.invalid) {
      return null;
    }
    if (!this.frmRegistro.value.condiciones) {
      Swal('Importante', 'Debe de aceptar las condiciones', 'warning');
      return;
    }
    let usuario = new Usuario(
          this.frmRegistro.value.nombre,
          this.frmRegistro.value.correo,
          this.frmRegistro.value.password
        );
    this._usuarioService.crearUsuario(usuario).subscribe(resp => this.router.navigate(['/login']));
  }

}
