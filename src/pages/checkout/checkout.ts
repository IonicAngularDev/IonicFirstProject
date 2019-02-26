import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, AlertController, ModalController } from 'ionic-angular';
import { CartProvider } from "../../providers/cart/cart";
import { ShippingPage } from '../shipping/shipping';
import { RestapiProvider } from '../../providers/restapi/restapi';
import { Storage } from '@ionic/storage';
import { PayPal, PayPalPayment, PayPalConfiguration } from '@ionic-native/paypal';
import { FrontPage } from './../front/front';

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
  paydetails: any;
  responseEdit: any;
  constructor(public navCtrl: NavController, public navParams: NavParams,
    private cartService: CartProvider, public loadingCtrl: LoadingController,
    public modalCtrl: ModalController, public restProvider: RestapiProvider,
    private storage: Storage, private alertCtrl: AlertController, private PayPalMobile: PayPal) {
      this.totalpricec = this.navParams.get('totalprice');
      this.getUserShipping();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CheckoutPage');
    //this.loadCartItems();
    let loader = this.loadingCtrl.create({
      content: "Wait.."
    });
    loader.present();
    loader.dismiss();
  }

  loadCartItems() {
    // let loader = this.loadingCtrl.create({
    //   content: "Wait.."
    // });
    // loader.present();
    this.cartService.getCartItems()
    .then(val => {
        this.cartItems = val;
        if (this.cartItems.length > 0) {
          this.cartItems.forEach((v, indx) => {
            this.productAmt += parseInt(v.totalPrice);
          });
          this.totalAmount = this.productAmt;
        }
        //loader.dismiss();
      })
      .catch(err => {});
  }

  presentProfileModal() {
    let loader = this.loadingCtrl.create({
        content: "Wait.."
    });
    loader.present();
    let profileModal = this.modalCtrl.create(ShippingPage);
    profileModal.onDidDismiss(() => {
      this.navCtrl.setRoot(CheckoutPage,
        {
          totalprice: this.totalpricec
        });
    });
    loader.dismiss();
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

  makepaymentp()
  {
    //console.log("Payment");
    this.PayPalMobile.init({
      PayPalEnvironmentProduction: 'YOUR_PRODUCTION_CLIENT_ID',
      PayPalEnvironmentSandbox: 'AdiPqdh94V4GBmOL9arrekScEGLqO0Q4h53V3qxRcfUFxxoyNWy10aTrQw-sL788ljYoE9lQzkSnsOXo',
    }).then(() => {
      // Environments: PayPalEnvironmentNoNetwork, PayPalEnvironmentSandbox, PayPalEnvironmentProduction
      this.PayPalMobile.prepareToRender('PayPalEnvironmentSandbox', new PayPalConfiguration({
        // Only needed if you get an "Internal Service Error" after PayPal login!
        //payPalShippingAddressOption: 2 // PayPalShippingAddressOptionPayPal
      })).then(() => {
        console.log(this.totalpricec);
        let payment = new PayPalPayment(this.totalpricec, 'USD', 'Description', 'sale');
        this.PayPalMobile.renderSinglePaymentUI(payment).then((data) => {
          // Successfully paid
          //console.log(data);
          this.paydetails = data;
          console.log(this.paydetails.response);

    this.storage.get("ID").then((val) =>
    {
      if(val)
      { 
        let userorderdetails = {
          payment_id: this.paydetails.response.id,
          payment_status: this.paydetails.response.state,
          user_id: val,
          delivery_charges: 0,
        };
        this.restProvider.sendpaymentdetails(userorderdetails, 'ProceedToOrder/'+this.paydetails.response.id+'/'+this.paydetails.response.state+'/'+val+'/'+0).subscribe((data) => {
          //console.log(data);
          if (data) {
            this.responseEdit = data;
            console.log(this.responseEdit.msg);
            this.navCtrl.setRoot(FrontPage);
            if (this.responseEdit.status === 'success') {
              console.log("Sucesss");
            }
          }
        });
      }
    });
          // Example sandbox response
          //
          // {
          //   "client": {
          //     "environment": "sandbox",
          //     "product_name": "PayPal iOS SDK",
          //     "paypal_sdk_version": "2.16.0",
          //     "platform": "iOS"
          //   },
          //   "response_type": "payment",
          //   "response": {
          //     "id": "PAY-1AB23456CD789012EF34GHIJ",
          //     "state": "approved",
          //     "create_time": "2016-10-03T13:33:33Z",
          //     "intent": "sale"
          //   }
          // }
        }, () => {
          // Error or render dialog closed without being successful
          console.log("Error or render dialog closed without being successful");
        });
      }, () => {
        // Error in configuration
        console.log("Error in configuration");
      });
    }, () => {
      // Error in initialization, maybe PayPal isn't supported or something else
      console.log("Error in initialization, maybe PayPal isn't supported or something");
    });
  }

}
