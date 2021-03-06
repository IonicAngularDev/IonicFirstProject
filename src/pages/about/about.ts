import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController } from 'ionic-angular';
import { RestapiProvider } from '../../providers/restapi/restapi';

@IonicPage()
@Component({
  selector: 'page-about',
  templateUrl: 'about.html',
})
export class AboutPage {
  aboutus: any = [];
  aboutdetails: any = [];
  abouth1: any;
  aboutnum: any = [3, 4, 5, 6];
  constructor(public navCtrl: NavController, public navParams: NavParams,
    public restProvider: RestapiProvider, public loadingCtrl: LoadingController) {
      this.getAboutDetails();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AboutPage');
  }

  getAboutDetails()
  {
    let loader = this.loadingCtrl.create({
      content: "Wait.."
    });
    loader.present();
    this.restProvider.getaboutus()
      .then(data => {
      this.aboutus = data;
      this.aboutdetails = this.aboutus.msg;
      //this.abouth1 = this.aboutdetails["0"].main_head;
      //console.log(this.aboutdetails["0"].main_head);
      //console.log(this.aboutdetails);
      });
      loader.dismiss();
  }
}
