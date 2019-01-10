import { CheckoutPage } from './../checkout/checkout';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, AlertController } from 'ionic-angular';
import { CartProvider } from "../../providers/cart/cart";

/**
 * Generated class for the CartPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-cart',
  templateUrl: 'cart.html',
})
export class CartPage {
 cartItems: any[] = [];
 totalAmount: number = 0;
 isCartItemLoaded: boolean = false;
 isEmptyCart: boolean = true;
 productCount: number = 1;
  constructor(public navCtrl: NavController, public navParams: NavParams, private cartService: CartProvider, public loadingCtrl: LoadingController, private alertCtrl: AlertController) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CartPage');
    this.cartService.getCartItems().then((val) => {
      this.cartItems = val;
      console.log(val);
    });
    this.loadCartItems();
  }

  loadCartItems() {
    let loader = this.loadingCtrl.create({
      content: "Wait.."
    });
    loader.present();
    this.cartService
      .getCartItems()
      .then(val => {
        this.cartItems = val;
        //console.log(this.cartItems.length);
        if (this.cartItems.length > 0) {
          this.cartItems.forEach((v, indx) => {
            this.totalAmount += parseInt(v.totalPrice);
            console.log(this.totalAmount);
          });
          this.isEmptyCart = false;
        }

        this.isCartItemLoaded = true;
        loader.dismiss();
      })
      .catch(err => {});
  }

  removeItem(itm) {
    // this.cartService.removeFromCart(itm).then(() => {
    //   this.loadCartItems();
    // });

    let alert = this.alertCtrl.create({
      title: 'Remove Product',
      message: 'Do you want to remove this product?',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          handler: () => {
            console.log('Cancel Clicked');
          }
        },
        {
          text: 'Yes',
          handler: () => {
            this.cartService.removeFromCart(itm).then(() => {
              this.loadCartItems();
            });
            //console.log('Buy clicked');
          }
        }
      ]
    });
    alert.present();
  }

  checkpage()
  {
    this.navCtrl.push(CheckoutPage);
  }

  decreaseProductCount(itm) {
    if (itm.count > 1) {
      itm.count--;
    }
  }

  incrementProductCount(itm) {
    itm.count++;
  }

}
