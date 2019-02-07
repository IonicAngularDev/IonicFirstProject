import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, AlertController, ModalController } from 'ionic-angular';
import { CartProvider } from "../../providers/cart/cart";
import { ShippingPage } from '../shipping/shipping';
import { RestapiProvider } from '../../providers/restapi/restapi';
import { Storage } from '@ionic/storage';


@IonicPage()
@Component({
  selector: 'page-checkout',
  templateUrl: 'checkout.html',
})
export class CheckoutPage {
  cartItems: any[] = [];
  productAmt: number = 0;
  totalAmount: number = 0;
  shippingd: any = [];
  shippingdetails: any = [];
  isCheckboxDisabled:boolean=false;
  checkedDrivers: any = [];
  constructor(public navCtrl: NavController, public navParams: NavParams,
    private cartService: CartProvider, public loadingCtrl: LoadingController,
    public modalCtrl: ModalController, public restProvider: RestapiProvider,
    private storage: Storage) {
      this.getUserShipping();
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

  presentProfileModal() {
    let profileModal = this.modalCtrl.create(ShippingPage);
    profileModal.onDidDismiss(() => {
      this.navCtrl.setRoot(CheckoutPage);
    });
    profileModal.present();
  }

  getUserShipping()
  {
  this.storage.get("ID").then((val) =>
    {
      if(val)
      {
       //console.log(val);
       this.getShippingAddress(val);

      }
      else
      {
        console.log("Please Login");
      }
    });
  }

  getShippingAddress($sid)
  {
    this.restProvider.getshipping($sid)
      .then(data => {
      this.shippingd = data;
      this.shippingdetails = this.shippingd.msg;
      //console.log(this.shippingdetails);
      });
  }

  removeshipping(itm)
  {
     console.log(itm);
  }

  editshipping(itm)
  {
     console.log(itm);
  }

  // selectCP(itm){
  //   if (itm.checked === true) {
  //     this.checkedDrivers.push(itm);
  // } else if (itm.checked === false) {
  //    this.checkedDrivers.splice(this.checkedDrivers.indexOf(itm), 1);
  // }
  // }
}
