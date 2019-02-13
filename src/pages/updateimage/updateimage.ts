import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';

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
  constructor(public navCtrl: NavController, public navParams: NavParams,
    private formBuilder: FormBuilder) {
      this.updateprofileimg = this.formBuilder.group({
        img_upload: ['', Validators.required],
      });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad UpdateimagePage');
  }

  changeProfileImage()
  {
    console.log("Image");
  }

  onImageSelected(event) {
    this.selectedImage = event.target.files[0];
    let reader = new FileReader();

    reader.onload = (e: any) => {
      this.imageUrl = e.target.result;
    };
    reader.readAsDataURL(this.selectedImage);
  }
}
