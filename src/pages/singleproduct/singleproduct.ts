import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import { CartProvider } from '../../providers/cart/cart';
import { RestapiProvider } from '../../providers/restapi/restapi';
import { Storage } from '@ionic/storage';

/**
 * Generated class for the SingleproductPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-singleproduct',
  templateUrl: 'singleproduct.html',
})
export class SingleproductPage {
  detailsp: any = [];
  count: number = 1;
  responseEdit: any;
  userpro: any;
  uproducts: any;
  SelectedSize:any;
  nosize: boolean = true;
  hassize:boolean = true;
  hassizenot: boolean = false;
  isenabled: boolean = false;
  constructor(public navCtrl: NavController, public navParams: NavParams,
    private cartService: CartProvider, public toastCtrl: ToastController, 
    private storage: Storage, public restProvider: RestapiProvider) {
    this.detailsp = this.navParams.get('product');
    //this.detailsp.forEach(product => product.count = 1);
    console.log(this.detailsp);
    if(this.detailsp.product_size)
      {
        this.nosize = true;
      }
      else{
        this.nosize = false;
        this.isenabled = true;
        this.hassize = false;
        this.hassizenot = true;
      }

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SingleproductPage');
  }

  addToCart(detailsp) {
    console.log(detailsp);
    // var productPrice = parseInt(detailsp.product_actual_price) || parseInt(detailsp.productPrice);
    // let cartProduct = {
    //   product_id: detailsp.id || detailsp.product_id,
    //   name: detailsp.product_name || detailsp.name,
    //   image: detailsp.image,
    //   pimage: detailsp.images || detailsp.pimage,
    //   count: this.count,
    //   //heart_clicked: detailsp.heart_clicked,
    //   psize: detailsp.SelectedSize,
    //   disprice: detailsp.product_price || detailsp.disprice,
    //   discountp: detailsp.discount || detailsp.discountp,
    //   ditailspro: detailsp.product_details || detailsp.ditailspro,
    //   productPrice: parseInt(detailsp.product_actual_price) || parseInt(detailsp.productPrice),
    //   totalPrice: productPrice,
    // };
    // //console.log(cartProduct);
    // //this.presentToast(productdet.product_name);

    // this.cartService.addToCart(cartProduct).then((val) => {
    //   this.presentToast(cartProduct.name);
    // });

    this.storage.get("ID").then((val) =>
    {
      if(val)
      { 
        if(detailsp.SelectedSize)
        {
          let usercartnewdetails = {
            user_id: val,
            product_id: detailsp.id,
            size: detailsp.SelectedSize,
          };
          this.restProvider.usercartproducts(usercartnewdetails, 'user_cart/'+detailsp.id+'/'+val+'/'+detailsp.SelectedSize).subscribe((data) => {
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
                this.presentToast(detailsp.product_name);
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
            product_id: detailsp.id,
          };
          this.restProvider.usercartproducts(usercartnewdetails, 'user_cart/'+detailsp.id+'/'+val).subscribe((data) => {
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
                this.presentToast(detailsp.product_name);
              }
              else{
                this.presentToasterror();
              }
            }
          });
        }
      }
    });
    
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

  presentToast(name: any) {
    let toast = this.toastCtrl.create({
      message: `${name} has been added to cart`,
      showCloseButton: true,
      closeButtonText: 'OK',
      duration: 1500,
    });

    toast.onDidDismiss(() => {
      //this.navCtrl.push(CartPage);
    });
    toast.present();
  }

}
