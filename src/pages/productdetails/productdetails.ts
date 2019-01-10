import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import { CartProvider } from '../../providers/cart/cart';
import { CartPage } from '../cart/cart';

/**
 * Generated class for the ProductdetailsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-productdetails',
  templateUrl: 'productdetails.html',
})
export class ProductdetailsPage {
  detailsp: any = [];
  pdeta: any = [];
  items: Object[] = [];
  itemsInCart: Object[] = [];
  selectProduct: any;
  //heart_clicked: boolean;
  totalPrice: any;
  productCount: number = 1;
  //count: number = 1;
  cartItems: any[];
  constructor(public navCtrl: NavController, public navParams: NavParams, private cartService: CartProvider, public toastCtrl: ToastController) {
    this.detailsp = this.navParams.get('productdet');
    // this.pdeta.forEach(product => product.count = 1);
    this.pdeta = this.detailsp.msg;
    this.pdeta.forEach(product => product.count = 1);
    //this.pdeta.forEach(product => product.heart_clicked = true);
    console.log(this.detailsp);
    if (this.navParams.get("productdet")) {
      window.localStorage.setItem('ProductdetailsPage', JSON.stringify(this.navParams.get("productdet")));
    }

  }

  ionViewDidEnter(){
    this.getSingleProduct();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ProductdetailsPage');
    this.selectProduct = this.navParams.get("productdet");
    this.cartService.getCartItems().then((val) => {
      this.cartItems = val;
    })
  }

  getSingleProduct() {
    if (window.localStorage.getItem('productdet') != 'undefined') {
      this.selectProduct = JSON.parse(window.localStorage.getItem('productdet'))
    }
  }

  addToCart(detailsp) {
    var productPrice = this.productCount * parseInt(detailsp.product_actual_price);
    let cartProduct = {
      product_id: detailsp.id,
      name: detailsp.product_name,
      image: detailsp.image,
      count: detailsp.count,
      //heart_clicked: detailsp.heart_clicked,
      productPrice: this.productCount * parseInt(detailsp.product_actual_price),
      totalPrice: productPrice,
    };
    console.log(cartProduct);
    //this.presentToast(productdet.product_name);

    this.cartService.addToCart(cartProduct).then((val) => {
      this.presentToast(cartProduct.name);
    });
  }

  presentToast(name: any) {
    let toast = this.toastCtrl.create({
      message: `${name} has been added to cart`,
      showCloseButton: true,
      closeButtonText: 'View Cart'
    });

    toast.onDidDismiss(() => {
      this.navCtrl.push(CartPage);
    });
    toast.present();
  }
  // addToCart()
  // {
  //   console.log('Added');
  //   item.quantityInCart += 1;
  //   this.itemsInCart.push(item);
  //   console.log(this.itemsInCart);
  //   localStorage.setItem('cart', JSON.stringify(this.itemsInCart));
  // }

  // decreaseProductCount(product) {
  //   if (product.count > 1) {
  //     product.count--;
  //   }
  // }

  // incrementProductCount(product) {
  //   product.count++;
  // }

  decreaseProductCount(product) {
    if(typeof product.count === 'undefined') {
       product.count = 1;
    }
    if (product.count > 1) {
      product.count--;
    }
  }

  incrementProductCount(product) {
    if(typeof product.count === 'undefined') {
       product.count = 1;
    }
    product.count++;
  }

  // addtoWishlist(a,product){
  //   console.log(a);
  //   if(a==true){
  //     product.heart_clicked=false;
  //   }else
  //   {
  //     product.heart_clicked=true;
  //   }
  // }

  toggleOnWishlist(product){
    product.onWishlist = !product.onWishlist;
  }

}
