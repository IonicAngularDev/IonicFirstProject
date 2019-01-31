import { FrontPage } from './../front/front';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, ViewController } from 'ionic-angular';
import { CartPage } from './../cart/cart';
import { RestapiProvider } from '../../providers/restapi/restapi';
import { ProductdetailsPage } from './../productdetails/productdetails';
import { AboutPage } from '../about/about';
import { ContactPage } from '../contact/contact';
import { GalleryPage } from '../gallery/gallery';
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
    public restProvider: RestapiProvider, public loadingCtrl: LoadingController, private viewCtrl: ViewController) {
      this.getmerchcategory();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad MerchandisePage');
  }

  // ionViewWillEnter() {
  //   this.navCtrl.setRoot(MerchandisePage.component);
  // }

  // openPage(page) {
  //   Reset the content nav to have just this page
  //   we wouldn't want the back button to show in this scenario
  //   this.navCtrl.setRoot(MerchandisePage);
  // }

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

  aboutpage2()
{
    this.navCtrl.push(AboutPage);
}

contactpage2()
{
    this.navCtrl.push(ContactPage);
}

gallerypage2()
{
    this.navCtrl.push(GalleryPage);
}

frontpage2()
{
    this.navCtrl.push(FrontPage);
}
}
