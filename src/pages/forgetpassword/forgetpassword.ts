import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { CartPage } from './../cart/cart';
import { LoginpagePage } from '../loginpage/loginpage';
import {Validators, FormBuilder, FormGroup } from '@angular/forms';
import { RestapiProvider } from '../../providers/restapi/restapi';
/**
 * Generated class for the ForgetpasswordPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-forgetpassword',
  templateUrl: 'forgetpassword.html',
})
export class ForgetpasswordPage {
  todo : FormGroup;
  responseDatapa : any;
  userData = {"username": ""};
  message2: string;
  constructor(public navCtrl: NavController, public navParams: NavParams, private formBuilder: FormBuilder, public restProvider: RestapiProvider, private alertCtrl: AlertController) {
    this.todo = this.formBuilder.group({
      username: ['', Validators.compose([
        Validators.required,
        Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')
      ])],
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ForgetpasswordPage');
  }

  getpasswordUsers()
  {
    this.restProvider.getregisterpassword(this.userData, 'forgotpass').subscribe((data) => {
      if (data) {
        this.responseDatapa = data;
        if (this.responseDatapa.status === 'success') {
          this.message2 = "Password has been sent to your mail id";
		      this.presentAlert(this.message2);
        }
        else{
          this.message2 = "User Does Not Exists";
          this.presentAlert(this.message2);
        }
      }
    });
  }

  presentAlert($message2) {
    let alert = this.alertCtrl.create({
      title: $message2,
      buttons: [
        {
          text: 'Dismiss',
          role: 'cancel',
          handler: () => {
            this.todo.reset();
          }
        }
      ]
    });
    alert.present();
  }

  cardpage2()
 {
   this.navCtrl.push(CartPage);
 }

 loginback2()
  {
    this.navCtrl.push(LoginpagePage);
  }

}
