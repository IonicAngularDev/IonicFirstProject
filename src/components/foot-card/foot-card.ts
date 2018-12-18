import { Component } from '@angular/core';

/**
 * Generated class for the FootCardComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'foot-card',
  templateUrl: 'foot-card.html'
})
export class FootCardComponent {

  text: string;

  constructor() {
    console.log('Hello FootCardComponent Component');
    this.text = 'Hello World';
  }

}
