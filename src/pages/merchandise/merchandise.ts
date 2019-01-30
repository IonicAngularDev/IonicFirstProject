import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController } from 'ionic-angular';
import { CartPage } from './../cart/cart';
import { RestapiProvider } from '../../providers/restapi/restapi';
import { ProductdetailsPage } from './../productdetails/productdetails';

/**
 * Generated class for the MerchandisePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-merchandise',
  templateUrl: 'merchandise.html',
})
export class MerchandisePage {
  users: any = [];
  categories: any = [];
  procount: any = [];
  merchcat: any = [];
  pcount: any = [];
  pcatg: any = [];
  mcat: any = [];
  constructor(public navCtrl: NavController, public navParams: NavParams,
    public restProvider: RestapiProvider, public loadingCtrl: LoadingController) {
      this.getmerchcategory();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad MerchandisePage');
  }

  getmerchcategory()
  {
    let loader = this.loadingCtrl.create({
      content: "Wait.."
    });
    loader.present();
    this.restProvider.getmerchcat()
      .then(data => {
      this.merchcat = data;
      this.mcat = this.merchcat.msg.merchan_cat;
      //console.log(this.mcat);
      });
      loader.dismiss();
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

  cardpage2()
  {
    this.navCtrl.push(CartPage);
  }
}
