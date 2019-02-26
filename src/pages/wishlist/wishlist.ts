import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, AlertController, ToastController } from 'ionic-angular';
import { CartProvider } from "../../providers/cart/cart";
import { Storage } from '@ionic/storage';
import { RestapiProvider } from '../../providers/restapi/restapi';

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
  responseEdit: any;
  userpro: any;
  uproducts: any;
  constructor(public navCtrl: NavController, public navParams: NavParams, 
    private cartService: CartProvider, public loadingCtrl: LoadingController, 
    private alertCtrl: AlertController, public toastCtrl: ToastController, 
    private storage: Storage, public restProvider: RestapiProvider) {
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
        console.log(val);
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
     console.log(itm);
    //  var productPrice = parseInt(itm.product_actual_price);
    //  let cartProduct = {
    //   product_id: itm.id,
    //   name: itm.product_name,
    //   image: itm.image,
    //   count: itm.count,
    //   max_quantity: itm.max_quantity,
    //   disprice: itm.product_price,
    //   discountp: itm.discount,
    //   productPrice: parseInt(itm.product_actual_price),
    //   totalPrice: productPrice,
    // };
    //  this.cartService.addToCart(cartProduct).then((val) => {
    //   this.cartService.setCart(val.length);
    //   this.presentToast(cartProduct.name);
    // });
    
    this.storage.get("ID").then((val) =>
    {
      if(val)
      { 
        if(itm.SelectedSize)
        {
          let usercartnewdetails = {
            user_id: val,
            product_id: itm.id,
            size: itm.SelectedSize,
          };
          this.restProvider.usercartproducts(usercartnewdetails, 'user_cart/'+itm.id+'/'+val+'/'+itm.SelectedSize).subscribe((data) => {
            //console.log(data);
            if (data) {
              console.log("One");
              this.restProvider.getusercartproducts(val)
              .then(data => {
             this.userpro = data;
             this.uproducts = this.userpro.msg.ucart_products
             //console.log(this.userpro.msg.ucart_products);
             //console.log(this.userpro.msg.total_cart_products);
             //console.log(this.userpro.msg.total_amt);
             this.cartService.setCart(this.userpro.msg.total_cart_products);
	           });
              this.responseEdit = data;
              console.log(this.responseEdit.msg);
              if (this.responseEdit.status === 'success') {
                this.presentToast(itm.product_name);
              }
              else{
                this.presentToasterror();
              }
            }
          });
        }
        else
        {
          let usercartnewdetails = {
            user_id: val,
            product_id: itm.id,
          };
          this.restProvider.usercartproducts(usercartnewdetails, 'user_cart/'+itm.id+'/'+val).subscribe((data) => {
            //console.log(data);
            if (data) {
              console.log("Two");
              this.restProvider.getusercartproducts(val)
              .then(data => {
             this.userpro = data;
             this.uproducts = this.userpro.msg.ucart_products
             //console.log(this.userpro.msg.ucart_products);
             //console.log(this.userpro.msg.total_cart_products);
             //console.log(this.userpro.msg.total_amt);
             this.cartService.setCart(this.userpro.msg.total_cart_products);
	           });
              this.responseEdit = data;
              console.log(this.responseEdit.msg);
              if (this.responseEdit.status === 'success') {
                this.presentToast(itm.product_name);
              }
              else{
                this.presentToasterror();
              }
            }
          });
        }
      }
    });

    this.removeWishItem2(itm);
  }
  
  presentToasterror() {
    let toast = this.toastCtrl.create({
      message: `Product Cannot added to cart. Limit Exceeded.`,
      showCloseButton: true,
      closeButtonText: 'OK',
      duration: 1500,
    });

    toast.onDidDismiss(() => {
      //this.navCtrl.push(CartPage);
    });
    toast.present();
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
