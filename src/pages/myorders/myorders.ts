import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { CartPage } from './../cart/cart';
import { Storage } from '@ionic/storage';
import { RestapiProvider } from '../../providers/restapi/restapi';
/**
 * Generated class for the MyordersPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-myorders',
  templateUrl: 'myorders.html',
})
export class MyordersPage {
  userhas: boolean = false;
  usernot:  boolean = true;
  newuserid: any;
  userord: any;
  constructor(public navCtrl: NavController, public navParams: NavParams, private storage: Storage, public restProvider: RestapiProvider) {
    this.GetUsername();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad MyordersPage');
  }

  public GetUsername(){
      this.storage.get("ID").then((val) =>
      {
        if(val)
        {
        this.newuserid = val;
        this.userhas = true;
        this.usernot = false;
        this.restProvider.getorderdetails(val)
           .then(data => {
            this.userord = data;
            if(this.userord.msg['0'].order.length === 0)
            {
              console.log(0);
            }
            else{ console.log(1); }
         });
        }
      });
  }

  cardpage2()
 {
   this.navCtrl.push(CartPage);
 }
}
