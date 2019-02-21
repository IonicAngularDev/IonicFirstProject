import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, AlertController, ToastController } from 'ionic-angular';
import { CartProvider } from "../../providers/cart/cart";
import { Storage } from '@ionic/storage';

@IonicPage()
@Component({
  selector: 'page-wishlist',
  templateUrl: 'wishlist.html',
})
export class WishlistPage {
  wishItems: any[] = [];
  isCartItemLoaded: boolean = false;
  nowishproducts: boolean = false;
  forloginuser2: boolean;
  constructor(public navCtrl: NavController, public navParams: NavParams, 
    private cartService: CartProvider, public loadingCtrl: LoadingController, 
    private alertCtrl: AlertController, public toastCtrl: ToastController, 
    private storage: Storage) {
      this.storage.get("ID").then((val) =>
      {
        if(val)
        {
          this.loadWishItems();
          this.forloginuser2 = false;
        }
        else
        {
          this.forloginuser2 = true;
          this.cartService.setWish(0);
        }
      });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad WishlistPage');
    //this.loadWishItems();
  }

  loadWishItems() {
    let loader = this.loadingCtrl.create({
      content: "Wait.."
    });
    loader.present();
    this.cartService
      .getWishItems()
      .then(val => {
        this.wishItems = val;
        //console.log(val);
        //console.log(this.wishItems.length);
        this.cartService.setWish(this.wishItems.length);
        if(this.wishItems.length === 0)
        { 
        //console.log(this.wishItems.length);
        this.nowishproducts = true;
        }
        this.isCartItemLoaded = true;
        loader.dismiss();
      })
      .catch(err => {});
  }

  removeWishItem(itm)
  {
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
            this.cartService.removeFromWish(itm).then(() => {
              this.loadWishItems();
            });
          }
        }
      ]
    });
    alert.present();
  }

  WishItemToCart(itm)
  {
     //console.log(itm);
     var productPrice = parseInt(itm.product_actual_price);
     let cartProduct = {
      product_id: itm.id,
      name: itm.product_name,
      image: itm.image,
      count: itm.count,
      max_quantity: itm.max_quantity,
      disprice: itm.product_price,
      discountp: itm.discount,
      productPrice: parseInt(itm.product_actual_price),
      totalPrice: productPrice,
    };
     this.cartService.addToCart(cartProduct).then((val) => {
      this.cartService.setCart(val.length);
      this.presentToast(cartProduct.name);
    });
    this.removeWishItem2(itm);
  }

  removeWishItem2(itm)
  {
    this.cartService.removeFromWish(itm).then(() => {
      this.loadWishItems();
    });
  }

  presentToast(name: any) {
    let toast = this.toastCtrl.create({
      message: `${name} has been added to cart`,
      showCloseButton: true,
      closeButtonText: 'OK',
      duration: 2200,
    });

    toast.onDidDismiss(() => {
    });
    toast.present();
  }
}
