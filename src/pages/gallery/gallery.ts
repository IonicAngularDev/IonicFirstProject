import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { RestapiProvider } from '../../providers/restapi/restapi';

/**
 * Generated class for the GalleryPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-gallery',
  templateUrl: 'gallery.html',
})
export class GalleryPage {
  imggallery: any = [];
  galleryimages: any = [];
  constructor(public navCtrl: NavController, public navParams: NavParams,
    public restProvider: RestapiProvider) {
      this.getImagesGallery();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad GalleryPage');
  }

  getImagesGallery()
  {
    this.restProvider.getgallery()
      .then(data => {
      this.imggallery = data;
      this.galleryimages = this.imggallery.msg;
      console.log(this.galleryimages);
      });
  }
}
