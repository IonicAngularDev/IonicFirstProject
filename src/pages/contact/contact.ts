import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController } from 'ionic-angular';
import { RestapiProvider } from '../../providers/restapi/restapi';

/**
 * Generated class for the ContactPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-contact',
  templateUrl: 'contact.html',
})
export class ContactPage {
  contactus: any = [];
  detailscontact: any = [];
  constructor(public navCtrl: NavController, public navParams: NavParams,
    public restProvider: RestapiProvider, public loadingCtrl: LoadingController) {
      this.getContactDetails();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ContactPage');
  }

  getContactDetails()
  {
    let loader = this.loadingCtrl.create({
      content: "Wait.."
    });
    loader.present();
    this.restProvider.getcontact()
      .then(data => {
      this.contactus = data;
      this.detailscontact = this.contactus.msg;
      //console.log(this.detailscontact);
      });
    loader.dismiss();
  }
}
