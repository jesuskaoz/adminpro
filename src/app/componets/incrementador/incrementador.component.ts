import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-incrementador',
  templateUrl: './incrementador.component.html',
  styles: []
})
export class IncrementadorComponent implements OnInit {

  leyenda: string = 'Hola Mundo';
  porcentaje: number = 50;
  constructor() { }

  ngOnInit() {
  }

  incrementar(valor: number) {

    if (this.porcentaje >= 100 ) {
      this.porcentaje = 100;
      return;
    }
    if (this.porcentaje <= 0) {
      this.porcentaje = 0;
      return;
    }

    this.porcentaje = this.porcentaje + valor;
  }

}
