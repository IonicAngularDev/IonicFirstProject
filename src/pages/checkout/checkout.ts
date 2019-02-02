import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController } from 'ionic-angular';
import { CartProvider } from "../../providers/cart/cart";

@IonicPage()
@Component({
  selector: 'page-checkout',
  templateUrl: 'checkout.html',
})
export class CheckoutPage {
  cartItems: any[] = [];
  productAmt: number = 0;
  totalAmount: number = 0;
  constructor(public navCtrl: NavController, public navParams: NavParams,private cartService: CartProvider, public loadingCtrl: LoadingController) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CheckoutPage');
    this.loadCartItems();
  }

  loadCartItems() {
    let loader = this.loadingCtrl.create({
      content: "Wait.."
    });
    loader.present();
    this.cartService.getCartItems()
    .then(val => {
        this.cartItems = val;
        if (this.cartItems.length > 0) {
          this.cartItems.forEach((v, indx) => {
            this.productAmt += parseInt(v.totalPrice);
          });
          this.totalAmount = this.productAmt;
        }
        loader.dismiss();
      })
      .catch(err => {});
  }
}
