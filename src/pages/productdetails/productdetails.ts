import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the ProductdetailsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-productdetails',
  templateUrl: 'productdetails.html',
})
export class ProductdetailsPage {
  detailsp: any;
  items: Object[] = []
  itemsInCart: Object[] = [];
  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.detailsp = navParams.get('productdet');
    console.log(this.detailsp);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ProductdetailsPage');
  }

  addToCart()
  {
    console.log('Added');
    // item.quantityInCart += 1;
    // this.itemsInCart.push(item);
    // console.log(this.itemsInCart);
    // localStorage.setItem('cart', JSON.stringify(this.itemsInCart));
  }
}
