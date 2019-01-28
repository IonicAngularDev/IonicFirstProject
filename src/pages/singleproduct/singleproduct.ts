import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import { CartProvider } from '../../providers/cart/cart';

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
  detailsp: any;
  constructor(public navCtrl: NavController, public navParams: NavParams,
    private cartService: CartProvider, public toastCtrl: ToastController) {
    this.detailsp = this.navParams.get('product');
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SingleproductPage');
  }

  addToCart(detailsp) {
    //console.log(detailsp);
    var productPrice = parseInt(detailsp.product_actual_price) || parseInt(detailsp.productPrice);
    let cartProduct = {
      product_id: detailsp.id || detailsp.product_id,
      name: detailsp.product_name || detailsp.name,
      image: detailsp.image,
      count: detailsp.count,
      //heart_clicked: detailsp.heart_clicked,
      psize: detailsp.SelectedSize,
      disprice: detailsp.product_price || detailsp.disprice,
      discountp: detailsp.discount || detailsp.discountp,
      //diataisl: detailsp.product_details,
      productPrice: parseInt(detailsp.product_actual_price) || parseInt(detailsp.productPrice),
      totalPrice: productPrice,
    };
    //console.log(cartProduct);
    //this.presentToast(productdet.product_name);

    this.cartService.addToCart(cartProduct).then((val) => {
      this.presentToast(cartProduct.name);
    });
  }

  presentToast(name: any) {
    let toast = this.toastCtrl.create({
      message: `${name} has been added to cart`,
      showCloseButton: true,
      closeButtonText: 'OK',
      duration: 1100,
    });

    toast.onDidDismiss(() => {
      //this.navCtrl.push(CartPage);
    });
    toast.present();
  }

}
