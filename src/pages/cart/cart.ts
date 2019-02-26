import { CheckoutPage } from './../checkout/checkout';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, AlertController, Events, ToastController } from 'ionic-angular';
import { CartProvider } from "../../providers/cart/cart";
import { SingleproductPage } from '../singleproduct/singleproduct';
import { RestapiProvider } from '../../providers/restapi/restapi';
import { Storage } from '@ionic/storage';
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
 userpro: any;
 uproducts: any;
 totalAmountnew: number = 0;
 responseEdit: any;
 nocartproducts: boolean = true;
  constructor(public navCtrl: NavController, public navParams: NavParams,
    private cartService: CartProvider, public loadingCtrl: LoadingController,
    private alertCtrl: AlertController, public events: Events, 
    public toastCtrl: ToastController, public restProvider: RestapiProvider, 
    private storage: Storage) {
      this.storage.get("ID").then((val) =>
    {
      if(val)
      { 
	      this.getuserproducts(val);
	    }
	}); 

  }
  
  getuserproducts($upid)
  {
    let loader = this.loadingCtrl.create({
      content: "Wait.."
    });
    loader.present();
    this.restProvider.getusercartproducts($upid)
      .then(data => {
      this.userpro = data;
      this.uproducts = this.userpro.msg.ucart_products
      //this.pcatg = this.categories.msg.cat;
      console.log(this.userpro.msg.ucart_products);
      console.log(this.userpro.msg.total_cart_products);
      console.log(this.userpro.msg.total_amt);
      this.cartService.setCart(this.userpro.msg.total_cart_products);
      this.totalAmountnew = this.userpro.msg.total_amt;
      if(this.userpro.msg.total_cart_products > 0)
        { 
        //console.log(this.cartItems.length);
        this.nocartproducts = false;
        this.isEmptyCart = false;
        }

      });
      //loader.dismiss();
      setTimeout(() => {
        loader.dismiss();
      }, 1100);
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
    // let loader = this.loadingCtrl.create({
    //   content: "Wait.."
    // });
    // loader.present();
    this.cartService
      .getCartItems()
      .then(val => {
        this.cartItems = val;
        //console.log(this.cartItems);
        // if(this.cartItems.length === 0)
        // { 
        // //console.log(this.cartItems.length);
        // this.nocartproducts = true;
        // this.isEmptyCart = true;
        // }
        //console.log(this.cartItems);
        //console.log(this.cartItems.length);
        this.createWishUser(this.cartItems.length);
        //this.storage.set("ITEMSLength", this.cartItems.length);
        this.cartService.setCart(this.cartItems.length);
        if (this.cartItems.length > 0) {
          //this.isEmptyCart = false;
          this.recalculateTotalAmount();
        }
        this.isCartItemLoaded = true;
        //loader.dismiss();
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
            this.restProvider.removeuserproduct(itm).then(() => {
              this.storage.get("ID").then((val) =>
              {
                if(val)
                { 
                  this.getuserproducts(val);
                }
            }); 
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
    this.navCtrl.push(CheckoutPage, {
      totalprice: this.totalAmountnew,
    });
  }

  recalculateTotalAmount() {
    let newTotalAmount = 0;
    this.cartItems.forEach( cartItem => {
        newTotalAmount += (cartItem.productPrice * cartItem.count)
    });
    this.totalAmount = newTotalAmount;
}

  decreaseProductCount(itm) {
    if (itm.quantity > 1) {
      itm.quantity--;
      this.storage.get("ID").then((val) =>
    {
      if(val)
      { 
          console.log(itm.quantity);
          let usercartquantitydetails = {
            user_id: val,
            product_id: itm.product_id,
            quantity: itm.quantity,
          };
          this.restProvider.updatecartproductsquan(usercartquantitydetails, 'updateProductQuantity/'+val).subscribe((data) => {
            //console.log(data);
            if (data) {
              console.log("Quantity");
              this.navCtrl.setRoot(CartPage);
              this.responseEdit = data;
              console.log(this.responseEdit.msg);
            }
          });
      }
    });
      //this.recalculateTotalAmount();
    }
  }

  incrementProductCount(itm) {
    console.log(itm);
    if(itm.max_quantity > itm.quantity)
    {
     itm.quantity++;
     //this.recalculateTotalAmount();
     this.storage.get("ID").then((val) =>
    {
      if(val)
      { 
          console.log(itm.quantity);
          let usercartquantitydetails = {
            user_id: val,
            product_id: itm.product_id,
            quantity: itm.quantity,
          };
          this.restProvider.updatecartproductsquan(usercartquantitydetails, 'updateProductQuantity/'+val).subscribe((data) => {
            //console.log(data);
            if (data) {
              console.log("Quantity");
              this.navCtrl.setRoot(CartPage);
              this.responseEdit = data;
              console.log(this.responseEdit.msg);
            }
          });
      }
    });
    }
    else
    {
      itm.quantity = itm.max_quantity;
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
