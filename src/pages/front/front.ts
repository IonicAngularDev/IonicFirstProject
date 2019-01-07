import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ProductPage } from '../product/product';
/**
 * Generated class for the FrontPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-front',
  templateUrl: 'front.html',
})
export class FrontPage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  getproducts()
  {
    this.navCtrl.push(ProductPage);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad FrontPage');
  }

  

}
