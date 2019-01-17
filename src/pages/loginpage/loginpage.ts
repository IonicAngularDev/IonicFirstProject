import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, Events } from 'ionic-angular';
import { RestapiProvider } from '../../providers/restapi/restapi';
import { RegisterPage } from '../register/register';
import { CartPage } from './../cart/cart';
import {ForgetpasswordPage} from '../forgetpassword/forgetpassword';
import {Validators, FormBuilder, FormGroup } from '@angular/forms';
import { MyApp } from './../../app/app.component';

/**
 * Generated class for the LoginpagePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-loginpage',
  templateUrl: 'loginpage.html',
})
export class LoginpagePage {
  todo : FormGroup;
  responseData : any;
  userData = {"username": "", "password": ""};
  //users: any;
  user: any;
  constructor(public navCtrl: NavController, public navParams: NavParams,
    public restProvider: RestapiProvider, private formBuilder: FormBuilder, private alertCtrl: AlertController, public events: Events) {
      //this.getloginUsers();
      this.todo = this.formBuilder.group({
        username: ['', Validators.required],
        password: ['', Validators.required],
      });

  }

  createUser(user) {
    //console.log('User created!')
    this.events.publish('user:created', user);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginpagePage');
  }

    getloginUsers(){
  //console.log(this.userData.username);
      this.restProvider.getUsers(this.userData, 'user_Login').subscribe((data) => {
        //console.log(data);
        if (data) {
          this.responseData = data;
          //console.log(this.responseData.msg.name);
          this.user = this.responseData.msg.name;
          this.createUser(this.user);
          if (this.responseData.status === 'success') {
            //console.log(this.responseData);
            //console.log("User Details");
            this.navCtrl.push(MyApp);
          }
          else{
            this.presentAlert();
          }
        }
      });
 }

 presentAlert() {
  let alert = this.alertCtrl.create({
    title: 'Incorrect Username Or Password',
    buttons: ['Dismiss']
  });
  alert.present();
}

 cardpage2()
 {
   this.navCtrl.push(CartPage);
 }

 registerpage2()
 {
   this.navCtrl.push(RegisterPage);
 }

 forgetpassword2()
 {
  this.navCtrl.push(ForgetpasswordPage);
 }

 }



