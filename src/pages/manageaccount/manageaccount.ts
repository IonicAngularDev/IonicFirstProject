import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { CartPage } from './../cart/cart';
import { Storage } from '@ionic/storage';


@IonicPage()
@Component({
  selector: 'page-manageaccount',
  templateUrl: 'manageaccount.html',
})
export class ManageaccountPage {
  userhas: boolean = false;
  usernot:  boolean = true;
  newuserid: any;
  constructor(public navCtrl: NavController, public navParams: NavParams, private storage: Storage) {
    this.GetUsername();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ManageaccountPage');
  }

  public GetUsername(){
    this.storage.get("ID").then((val) =>
    {
      if(val)
      {
      this.newuserid = val;
      this.userhas = true;
      this.usernot = false;
      }
    });
}

  cardpage2()
 {
   this.navCtrl.push(CartPage);
 }

}
