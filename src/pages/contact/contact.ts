import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { CartPage } from './../cart/cart';
import { RestapiProvider } from '../../providers/restapi/restapi';

/**
 * Generated class for the ContactPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-contact',
  templateUrl: 'contact.html',
})
export class ContactPage {

  constructor(public navCtrl: NavController, public navParams: NavParams,
    public restProvider: RestapiProvider) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ContactPage');
  }

  cardpage2()
  {
    this.navCtrl.push(CartPage);
  }
}
