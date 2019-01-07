import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { RestapiProvider } from '../../providers/restapi/restapi';
import { ProductdetailsPage } from './../productdetails/productdetails';
import { CartPage } from './../cart/cart';

@IonicPage()
@Component({
  selector: 'page-product',
  templateUrl: 'product.html',
})
export class ProductPage {
  users: any;
  categories: any = [];
  pcatg: any = [];
  constructor(public navCtrl: NavController, public navParams: NavParams, public restProvider: RestapiProvider) {
  //this.getproducts($id);
  this.getcategories();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ProductPage');
    //this.getcategories();
  }

  ionViewWillEnter()
  {
    this.getcategories();
  }

  getcategories()
  {
    this.restProvider.getproductcategories()
      .then(data => {
      this.categories = data;
      this.pcatg = this.categories.msg.cat;
      console.log(this.categories.msg);
      });
  }

  getproducts($id)
  {
      //console.log($id);
      this.restProvider.getproductdetails($id)
      .then(data => {
      this.users = data;
      //console.log(this.users);
      this.navCtrl.push(ProductdetailsPage,
        {
          productdet : this.users,
        });
      });
  }

  cardpage2()
  {
    this.navCtrl.push(CartPage);
  }

}
