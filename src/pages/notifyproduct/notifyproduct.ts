import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { RestapiProvider } from '../../providers/restapi/restapi';

@IonicPage()
@Component({
  selector: 'page-notifyproduct',
  templateUrl: 'notifyproduct.html',
})
export class NotifyproductPage {
  notifyprod : FormGroup;
  uid2: any;
  usemail2: any;
  prodid2: any;
  responseEdit;
  constructor(public navCtrl: NavController, public navParams: NavParams, 
    private formBuilder: FormBuilder, public restProvider: RestapiProvider, 
    private alertCtrl: AlertController) {
      this.notifyprod = this.formBuilder.group({
        msg2: ['', Validators.required],
      }); 

      this.uid2 = navParams.get('usid');
      this.usemail2 = navParams.get('usemail');
      this.prodid2 = navParams.get('proid');
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad NotifyproductPage');
  }

  getnotifyproducts()
  {
    
        let nofifyproduct2 = {
          user_id: this.uid2,
          productid: this.prodid2,
          msg: this.notifyprod.value.msg2,
        };
        this.restProvider.submitnotifyproductform(nofifyproduct2, 'notifyme/'+this.uid2).subscribe((data) => {
          //console.log(data);
          if (data) {
            this.responseEdit = data;
            //console.log(this.responseEdit.msg);
            this.presentAlert(this.responseEdit.msg);
          }
        });
        //this.closeModal();
  }

  presentAlert($mess) {
    let alert = this.alertCtrl.create({
      title: $mess,
      buttons: [
        {
          text: 'Dismiss',
          role: 'cancel',
          handler: () => {
            this.notifyprod.reset();
          }
        }]
    });
    alert.present();
  }

}
