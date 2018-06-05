import { Component, OnInit, OnDestroy } from '@angular/core';
import { Observable, Subscriber, Subscription } from 'rxjs/Rx';
import { retry, map, filter } from 'rxjs/operators';


@Component({
  selector: 'app-rxjs',
  templateUrl: './rxjs.component.html',
  styles: []
})
export class RxjsComponent implements OnInit, OnDestroy {

  sub: Subscription;

  constructor() {
   this.sub = this.regresaObs().subscribe(
      numero => console.log('Contador', numero),
      error => console.error('Error', error),
      () => console.log('Termino!')
    );
   }

  ngOnInit() {
  }
  ngOnDestroy() {
    this.sub.unsubscribe();
  }

  regresaObs(): Observable<any> {
    return new Observable( (observer: Subscriber<any>) => {
      let contador = 0;
      let intervalo = setInterval(() => {
          contador += 1;

          const Salida = {
            valor: contador
          };
          observer.next( Salida );

          // if (contador === 3) {
          //   clearInterval(intervalo);
          //   observer.complete();
          // }
          // if (contador === 2) {
          //   clearInterval(intervalo);
          //   observer.error('404!');
          // }
      }, 1000);
  }).pipe(
      map( data => data.valor),
      filter( (valor, index) => {
        if ((valor % 2) === 1)  {
          // impar
          return true;
        } else {
          // Numero Par
          return false;
        }
      })
    );
  }

}
