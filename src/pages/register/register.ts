import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { LoginpagePage } from '../loginpage/loginpage';
import {Validators, FormBuilder, FormGroup } from '@angular/forms';
import { CartPage } from './../cart/cart';
import { RestapiProvider } from '../../providers/restapi/restapi';

/**
 * Generated class for the RegisterPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-register',
  templateUrl: 'register.html',
})
export class RegisterPage {
  todo : FormGroup;
  responseData2 : any;
  useregData = {"uname": "", "uemail": "", "unumber": "", "password": "" };
  constructor(public navCtrl: NavController, public navParams: NavParams, private formBuilder: FormBuilder, public restProvider: RestapiProvider, private alertCtrl: AlertController) {
    this.todo = this.formBuilder.group({
      uname: ['', Validators.required],
      uemail: ['', Validators.compose([
        Validators.required,
        Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')
      ])],
      unumber: ['', Validators.compose([
        Validators.maxLength(10),
        Validators.minLength(10),
        Validators.required
      ])],
      password: ['', Validators.required],
    });
  }

  validation_messages = {
    'uemail': [
      { type: 'pattern', message: 'Email Format is Invalid' }
    ],
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad RegisterPage');
  }

  getregisterUsers()
  {
    this.todo.controls;
    this.restProvider.getregisterUsers(this.useregData, 'register').subscribe((data) => {
      //console.log(data);
      if (data) {
        this.responseData2 = data;
        console.log(this.responseData2.msg);
        if (this.responseData2.status === 'success') {
          this.navCtrl.push(LoginpagePage);
        }
        else{
          this.presentAlert();
        }
      }
    });
  }

  presentAlert() {
    let alert = this.alertCtrl.create({
      title: 'You are using an already registered Email id',
      buttons: ['Dismiss']
    });
    alert.present();
  }

  loginback2()
  {
    this.navCtrl.push(LoginpagePage);
  }

  cardpage2()
  {
    this.navCtrl.push(CartPage);
  }
}
