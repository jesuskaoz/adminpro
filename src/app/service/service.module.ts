import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';

import {
  SettingsService,
  SharedService,
  SidebarService,
  UsuarioService,
  LoginGardGuard,
  SubirArchivoService
} from './service.index';
import { ModalUploadService } from '../componets/modal-upload/modal-upload.service';


@NgModule({
  imports: [
    CommonModule,
    HttpClientModule
  ],
  providers: [
    SettingsService,
    SharedService,
    SidebarService,
    UsuarioService,
    LoginGardGuard,
    SubirArchivoService,
    ModalUploadService
  ],
  declarations: []
})
export class ServiceModule { }
