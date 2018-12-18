import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { RestapiProvider } from '../../providers/restapi/restapi';

import { ListPage } from '../list/list';

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
  responseData : any;
  userData = {"email": "", "password": ""};
  //users: any;
  constructor(public navCtrl: NavController, public navParams: NavParams,
    public restProvider: RestapiProvider) {
      this.getloginUsers();
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

    this.restProvider.getUsers(this.userData,'user_Login').then((result) => {
     this.responseData = result;
     if(this.responseData.userData){
     console.log(this.responseData);
     console.log("User Details");
     //localStorage.setItem('userData', JSON.stringify(this.responseData));
     this.navCtrl.push(ListPage);
     }
     else{
       console.log("Incorrect Details"); }
    }, (err) => {
     // Error log
   });

 }


  // doLogin()
  // {
  //   if(this.users.email == this.email && this.users.password == this.password)
  //   {

  //   }
  // }

}
