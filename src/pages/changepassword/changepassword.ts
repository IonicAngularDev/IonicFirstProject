import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { AbstractControl } from '@angular/forms';
import { Storage } from '@ionic/storage';
import { RestapiProvider } from '../../providers/restapi/restapi';

/**
 * Generated class for the ChangepasswordPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-changepassword',
  templateUrl: 'changepassword.html',
})
export class ChangepasswordPage {
  updatepassword : FormGroup;
  responseEdit: any;
  constructor(public navCtrl: NavController, public navParams: NavParams,
    private formBuilder: FormBuilder, private storage: Storage,
    public restProvider: RestapiProvider, private alertCtrl: AlertController) {
      this.updatepassword = this.formBuilder.group({
        old_password: ['', Validators.required],
        new_password: ['', Validators.compose([
          Validators.minLength(6),
          Validators.required,
        ])],
        confirm_password: ['', Validators.compose([
          Validators.minLength(6),
          Validators.required,
        ])],
      }, {
        validator: this.MatchPassword
      });
  }

  private MatchPassword(AC: AbstractControl) {
    const new_password = AC.get('new_password').value // to get value in input tag
    const confirm_password = AC.get('confirm_password').value // to get value in input tag
     if(new_password != confirm_password) {
         //console.log('false');
         AC.get('confirm_password').setErrors( { MatchPassword: true } )
     } else {
         //console.log('true')
         AC.get('confirm_password').setErrors(null);
     }
 }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ChangepasswordPage');
  }

  changePasswordDetails()
  {
    //console.log("Password");
    this.storage.get("ID").then((val) =>
    {
      if(val)
      {
        let passwordupdate = {
          password: this.updatepassword.value.new_password,
          old_pass: this.updatepassword.value.old_password,
        };
        this.restProvider.cancelorderf(passwordupdate, 'update_user_password/'+val).subscribe((data) => {
          //console.log(data);
          if (data) {
            this.responseEdit = data;
            //console.log(this.responseEdit.msg);
            if (this.responseEdit.status === 'success') {
              this.presentAlert(this.responseEdit.msg);
            }
            else
            {
              this.presentAlert(this.responseEdit.msg);
            }
          }
        });
      }
    });
  }

  presentAlert($mess) {
    let alert = this.alertCtrl.create({
      title: $mess,
      buttons: [
        {
          text: 'Dismiss',
          role: 'cancel',
          handler: () => {
            this.updatepassword.reset();
          }
        }]
    });
    alert.present();
  }

}
