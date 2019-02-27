import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the OrderdetailsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-orderdetails',
  templateUrl: 'orderdetails.html',
})
export class OrderdetailsPage {
  orderdetailsn: any;
  orderdetfu: any;
  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.orderdetailsn = this.navParams.get('orderdetilspro');
    this.orderdetfu = this.orderdetailsn.msg
    console.log(this.orderdetailsn.msg);

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad OrderdetailsPage');
  }

}
