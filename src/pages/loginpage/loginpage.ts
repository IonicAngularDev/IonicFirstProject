import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { RestapiProvider } from '../../providers/restapi/restapi';
import { ListPage } from '../list/list';
import { FrontPage } from '../front/front';
import { CartPage } from './../cart/cart';
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
  providers: [NavParams],
})
export class LoginpagePage {
  todo : FormGroup;
  responseData : any;
  userData = {"username": "", "password": ""};
  //users: any;
  constructor(public navCtrl: NavController, public navParams: NavParams,
    public restProvider: RestapiProvider, private formBuilder: FormBuilder, private alertCtrl: AlertController) {
      //this.getloginUsers();
      this.todo = this.formBuilder.group({
        username: ['', Validators.required],
        password: ['', Validators.required],
      });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginpagePage');
  }

  // getloginUsers() {
  //   this.restProvider.getUsers()
  //   .then(data => {
  //     this.users = data;
  //     console.log(this.users);
  //   });
  // }

    getloginUsers(){
  //   this.restProvider.getUsers(this.userData,'user_Login').subscribe((result) => {
  //     if(result){
  //      this.responseData = result;
  //    if(this.responseData.userData){
  //    console.log(this.responseData);
  //    console.log("User Details");
  //    this.navCtrl.push(ListPage);
  //    }
  //    else{
  //      console.log("Incorrect Details"); }
  //   }
  //    }
  //    , (err) => {
  //     console.log("Incorrect Details");
  //  });

  //console.log(this.userData.username);
      this.restProvider.getUsers(this.userData, 'user_Login').subscribe((data) => {
        console.log(data);
        if (data) {
          this.responseData = data;
          console.log(this.responseData.msg.name);
          if (this.responseData.status === 'success') {
            //console.log(this.responseData);
            //console.log("User Details");
            this.navCtrl.push(MyApp,{
              param1: this.responseData.msg.name,
            });
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

 }



