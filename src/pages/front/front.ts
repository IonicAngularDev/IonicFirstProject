import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,  LoadingController } from 'ionic-angular';
import { ProductPage } from '../product/product';
import { ProductdetailsPage } from './../productdetails/productdetails';
import { RestapiProvider } from '../../providers/restapi/restapi';
/**
 * Generated class for the FrontPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-front',
  templateUrl: 'front.html',
})
export class FrontPage {
  users: any = [];
  categories: any = [];
  procount: any = [];
  merchcat: any = [];
  pcount: any = [];
  pcatg: any = [];
  mcat: any = [];
  HasSearch: boolean;
  constructor(public navCtrl: NavController, public navParams: NavParams, public restProvider: RestapiProvider, public loadingCtrl: LoadingController) {
    this.getcategories();
    this.getpcount();
    this.getmerchcategory();
  }

  // getproducts()
  // {
  //   this.navCtrl.push(ProductPage);
  // }

  ionViewDidLoad() {
    console.log('ionViewDidLoad FrontPage');
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

  getmerchproducts($imd)
  {
      //console.log($id);
      this.restProvider.getmerchproductdetails($imd)
      .then(data => {
      this.users = data;
      //console.log(this.users);
      this.navCtrl.push(ProductdetailsPage,
        {
          productdet : this.users,
        });
      });
  }

  getpcount()
  {
    // let loader = this.loadingCtrl.create({
    //   content: "Wait.."
    // });
    // loader.present();
    this.restProvider.getcount()
      .then(data => {
      this.procount = data;
      this.pcount = this.procount.msg;
      //console.log(this.pcount);
      });
      // loader.dismiss();
  }

  getmerchcategory()
  {
    // let loader = this.loadingCtrl.create({
    //   content: "Wait.."
    // });
    // loader.present();
    this.restProvider.getmerchcat()
      .then(data => {
      this.merchcat = data;
      this.mcat = this.merchcat.msg.merchan_cat;
      //console.log(this.mcat);
      });
      //loader.dismiss();
  }

  hasSearchnot()
  {
    this.HasSearch = !this.HasSearch;
  }
}
