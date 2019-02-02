import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, Events } from 'ionic-angular';
import { RestapiProvider } from '../../providers/restapi/restapi';
import { ProductdetailsPage } from './../productdetails/productdetails';
import { CartPage } from './../cart/cart';
import { CartProvider } from "../../providers/cart/cart";
import { Storage } from '@ionic/storage';
import { AboutPage } from '../about/about';
import { ContactPage } from '../contact/contact';
import { GalleryPage } from '../gallery/gallery';
import { FrontPage } from './../front/front';

@IonicPage()
@Component({
  selector: 'page-product',
  templateUrl: 'product.html',
})
export class ProductPage {
  users: any;
  categories: any = [];
  wishItems: any;
  itemlength: number;
  pcatg: any = [];
  constructor(public navCtrl: NavController, public navParams: NavParams, private cartService: CartProvider, public restProvider: RestapiProvider, public loadingCtrl: LoadingController, public events: Events, private storage: Storage) {
  //this.getproducts($id);
  this.getcategories();
  this.events.subscribe('wishlist:created', (pwish) => { // Update from Cart Page
    //console.log(pwish);
   });
   this.getproductslenght();
  }


  ionViewDidLoad() {
    console.log('ionViewDidLoad ProductPage');
    //this.getcategories();
  }

  ionViewWillEnter()
  {
    //this.getcategories();
  }

  getcategories()
  {
    let loader = this.loadingCtrl.create({
      content: "Wait.."
    });
    loader.present();
    this.restProvider.getproductcategories()
      .then(data => {
      this.categories = data;
      this.pcatg = this.categories.msg.cat;
      //console.log(this.categories.msg);
      });
      loader.dismiss();
  }

  getproductslenght()
  {
    this.storage.get("ITEMSLength").then((val) =>
    {
      //console.log(val);
      this.itemlength = val;
    });
  }

  getproducts($id)
  {
      //console.log($id);
      this.restProvider.getproductdetails($id)
      .then(data => {
       this.users = data;
      // console.log(this.users);
      this.navCtrl.push(ProductdetailsPage,
        {
          productdet : this.users,
        });
      //this.updateProductListBasedOnWishList(data);
      });
  }

  // updateProductListBasedOnWishList(products){
  //   this.cartService
  //     .getWishItems()
  //     .then(val => {
  //       this.wishItems = val;
  //       console.log(val);
  //       products = products.map(item => {
  //         let item2 = this.wishItems.find(i2 => i2.id === item.id);
  //         return item2 ? { ...item, ...item2 } : item;
  //       });

  //       this.users = products;

  //       this.navCtrl.push(ProductdetailsPage,
  //         {
  //           productdet : this.users,
  //         });
  //       });
  // }

  cardpage2()
  {
    this.navCtrl.push(CartPage);
  }

  aboutpage2()
{
    this.navCtrl.setRoot(AboutPage);
}

contactpage2()
{
    this.navCtrl.setRoot(ContactPage);
}

gallerypage2()
{
    this.navCtrl.setRoot(GalleryPage);
}

frontpage2()
{
    this.navCtrl.setRoot(FrontPage);
}

}
