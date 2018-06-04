import { Component, OnInit, Input, Output , EventEmitter, ViewChild, ElementRef} from '@angular/core';


@Component({
  selector: 'app-incrementador',
  templateUrl: './incrementador.component.html',
  styles: []
})
export class IncrementadorComponent implements OnInit {


 @ViewChild('txtProgress') txtProgress: ElementRef;
 @Input('nombre') leyenda: string = 'Hola Mundo';
 @Input() porcentaje: number = 50;

 @Output() CambioValor: EventEmitter<number> = new EventEmitter();
  constructor() {

  }

  ngOnInit() {
  }

  onChanges( newValue: number ) {

    if ( newValue >= 100) {
        this.porcentaje = 100;
    } else if ( newValue >= 100) {
      this.porcentaje = 0;
    } else {
      this.porcentaje = newValue;
    }
    this.txtProgress.nativeElement.value = this.porcentaje;
    this.CambioValor.emit(this.porcentaje);
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
    this.CambioValor.emit(this.porcentaje);
    this.txtProgress.nativeElement.focus();
  }

}
