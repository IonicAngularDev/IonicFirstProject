import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { RestapiProvider } from '../../providers/restapi/restapi';
import { Storage } from '@ionic/storage';
import { ManageaccountPage } from './../manageaccount/manageaccount';

@IonicPage()
@Component({
  selector: 'page-updateimage',
  templateUrl: 'updateimage.html',
})
export class UpdateimagePage {
  updateprofileimg : FormGroup;
  img_upload: any = [];
  selectedImage;
  imageUrl;
  converted_image;
  responseEdit: any;
  constructor(public navCtrl: NavController, public navParams: NavParams,
    private formBuilder: FormBuilder, public restProvider: RestapiProvider,
    private storage: Storage, private alertCtrl: AlertController) {
      this.updateprofileimg = this.formBuilder.group({
        img_upload: ['', Validators.required],
      });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad UpdateimagePage');
  }

  onImageSelected(event) {
    this.selectedImage = event.target.files[0];
    let reader = new FileReader();

    reader.onload = (e: any) => {
      this.imageUrl = e.target.result;
      this.converted_image = "data:image/jpeg;base64,"+this.imageUrl;
    };
    reader.readAsDataURL(this.selectedImage);
  }

  changeProfileImage()
  {
    //console.log("Image");
    
    this.storage.get("ID").then((val) =>
    {
      if(val)
      { 
        // let updateimguser = {
        //   user_id: val,
        //   upic: fd,
        // };
        var fd = new FormData();
        fd.append('upic', this.selectedImage, this.selectedImage.name);
        fd.append('user_id', val);
        this.restProvider.updateprofileimg(fd, 'update_profilepic/'+val).subscribe((data) => {
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
            this.navCtrl.setRoot(ManageaccountPage);
          }
        }]
    });
    alert.present();
  }

  changeProfileImage2()
  {
   
  }

}
