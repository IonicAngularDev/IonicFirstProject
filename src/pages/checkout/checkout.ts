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
  removesh: any;
  totalpricec: any;
  RadioValue: boolean;
  constructor(public navCtrl: NavController, public navParams: NavParams,
    private cartService: CartProvider, public loadingCtrl: LoadingController,
    public modalCtrl: ModalController, public restProvider: RestapiProvider,
    private storage: Storage, private alertCtrl: AlertController) {
      this.totalpricec = this.navParams.get('totalprice');
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
      this.navCtrl.setRoot(CheckoutPage,
        {
          totalprice: this.totalpricec
        });
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
      console.log(this.shippingdetails);
      });
  }

  removeshipping(itm)
  {
      let alert = this.alertCtrl.create({
        title: 'Remove Shipping',
        message: 'Do you want to remove this shipping?',
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
              this.restProvider.removeshipping(itm)
              .then(data => {
               this.removesh = data;
             });
             this.navCtrl.setRoot(this.navCtrl.getActive().component);
             this.navCtrl.setRoot(CheckoutPage,
              {
                totalprice: this.totalpricec
              });
            }
          }
        ]
      });
      alert.present();
  }

  editshipping(itm)
  {
     //console.log(itm);
     let profileModal2 = this.modalCtrl.create(ShippingPage, {itm: itm});
     profileModal2.onDidDismiss(() => {
      this.navCtrl.setRoot(CheckoutPage,
      {
        totalprice: this.totalpricec
      });
    });
     profileModal2.present();
  }

  // selectCP(itm){
  //   if (itm.checked === true) {
  //     this.checkedDrivers.push(itm);
  // } else if (itm.checked === false) {
  //    this.checkedDrivers.splice(this.checkedDrivers.indexOf(itm), 1);
  // }
  // }
}
