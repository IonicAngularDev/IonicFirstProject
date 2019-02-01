import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,  LoadingController } from 'ionic-angular';
import { ProductdetailsPage } from './../productdetails/productdetails';
import { RestapiProvider } from '../../providers/restapi/restapi';
import { SingleproductPage } from '../singleproduct/singleproduct';
import { CartPage } from './../cart/cart';
import { MerchandisePage } from '../merchandise/merchandise';

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
  finalseaproduct: any = [];
  searchproduct: any = [];
  finalproductsearch: any;
  HasSearch: boolean;
  mysInput: string;
  constructor(public navCtrl: NavController, public navParams: NavParams,
    public restProvider: RestapiProvider, public loadingCtrl: LoadingController) {
    this.getcategories();
    this.getpcount();
    this.getmerchcategory();
    this.getsearchproducts();
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
      this.navCtrl.setRoot(ProductdetailsPage,
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

  getsearchproducts()
  {
    this.restProvider.getproductsforsearch()
      .then(data => {
      this.searchproduct = data;
      this.finalseaproduct = this.searchproduct.msg;
      //console.log(this.finalseaproduct);
      });
  }

  // setSearchProducts()
  // {
  //    this.searchproduct.filter(searproduct => {
  //      return searproduct.product_name.includes(this.mysInput);
  //    });
  //    console.log(this.mysInput);
  // }

  setSearchProducts(searchbar) {
    this.finalproductsearch = [];

    var query = searchbar.target.value;
    if (query.trim() == '') {
      return;
    }

    this.finalproductsearch = this.finalseaproduct.filter((value)=> {
      if (value.product_name.toLowerCase().indexOf(query.toLowerCase()) > -1) {
        return true;
      }
      return false;
    });
  }

  showProductDetails(item)
  {
     //console.log(item);
     this.navCtrl.setRoot(SingleproductPage,
      {
        product: item
      });
  }

  merchandisepage2()
{
    this.navCtrl.setRoot(MerchandisePage);
}

cardpage2()
{
    this.navCtrl.setRoot(CartPage);
}
}
