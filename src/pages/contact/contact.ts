import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, AlertController } from 'ionic-angular';
import { RestapiProvider } from '../../providers/restapi/restapi';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';

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
  submitquery : FormGroup;
  responseEdit: any;
  iname = ['pin','call','mail'];
  constructor(public navCtrl: NavController, public navParams: NavParams,
    public restProvider: RestapiProvider, public loadingCtrl: LoadingController, 
    private formBuilder: FormBuilder, private alertCtrl: AlertController) {
      this.getContactDetails();
      this.submitquery = this.formBuilder.group({
        name: ['', Validators.required],
        email: ['', Validators.compose([
          Validators.required,
          Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')
        ])],
        phone: ['', Validators.compose([
          Validators.maxLength(10),
          Validators.minLength(10),
          Validators.required
        ])],
        message: ['', Validators.required],
      });
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

  submityourquery()
  {
        this.restProvider.submitcontactform(this.submitquery.value, 'contactform').subscribe((data) => {
          //console.log(data);
          if (data) {
            this.responseEdit = data;
            //console.log(this.responseEdit.msg);
            if (this.responseEdit.status === 'success') {
              this.presentAlert(this.responseEdit.msg);
            }
            
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
            this.submitquery.reset();
          }
        }]
    });
    alert.present();
  }
}
