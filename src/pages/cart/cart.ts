import { CheckoutPage } from './../checkout/checkout';
import { Component, ChangeDetectorRef } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, AlertController, Events, ToastController } from 'ionic-angular';
import { CartProvider } from "../../providers/cart/cart";
import { Storage } from '@ionic/storage';
import { SingleproductPage } from '../singleproduct/singleproduct';
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
 ifSize: boolean = true;
 productCount: number = 1;
  constructor(public navCtrl: NavController, public navParams: NavParams,
    private cartService: CartProvider, public loadingCtrl: LoadingController,
    private alertCtrl: AlertController, private cdr: ChangeDetectorRef,
    public events: Events, private storage: Storage, public toastCtrl: ToastController) {
  }

  createWishUser(pwish) {
    //console.log('User created!')
    this.events.publish('wishlist:created', pwish);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CartPage');
    // this.cartService.getCartItems().then((val) => {
    //   this.cartItems = val;
    //   console.log(val);
    //   if(val.psize === undefined)
    //   {
    //     this.ifSize = false;
    //   }
    // });
    this.loadCartItems();
  }

  showDetails(detailsp)
  {
     //console.log(detailsp);
     this.navCtrl.push(SingleproductPage,
      {
        product: detailsp
      });
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
        //console.log(this.cartItems);
        //console.log(this.cartItems.length);
        this.createWishUser(this.cartItems.length);
        this.storage.set("ITEMSLength", this.cartItems.length);
        if (this.cartItems.length > 0) {
          this.isEmptyCart = false;
          this.recalculateTotalAmount();
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
            //console.log('Cancel Clicked');
          }
        },
        {
          text: 'Yes',
          handler: () => {
            //console.log(itm.product_id);
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

  recalculateTotalAmount() {
    let newTotalAmount = 0;
    this.cartItems.forEach( cartItem => {
        newTotalAmount += (cartItem.productPrice * cartItem.count)
    });
    this.totalAmount = newTotalAmount;
}

  decreaseProductCount(itm) {
    if (itm.count > 1) {
      itm.count--;
      this.recalculateTotalAmount();
    }
  }

  incrementProductCount(itm) {
    if(itm.max_quantity > itm.count)
    {
     itm.count++;
     this.recalculateTotalAmount();
    }
    else
    {
      itm.count = itm.max_quantity;
      this.presentMaxToast2();
    }
  }

  presentMaxToast2() {
    let toast = this.toastCtrl.create({
      message: `You have reached at the max quantity limit of the product.`,
      showCloseButton: false,
      duration: 2200,
    });

    toast.onDidDismiss(() => {
    });
    toast.present();
  }

}
