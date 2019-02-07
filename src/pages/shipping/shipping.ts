import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {Validators, FormBuilder, FormGroup } from '@angular/forms';
import { RestapiProvider } from '../../providers/restapi/restapi';
import { Storage } from '@ionic/storage';

/**
 * Generated class for the ShippingPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-shipping',
  templateUrl: 'shipping.html',
})
export class ShippingPage {
  shippingdet : FormGroup;
  userData = {"shipping_name": "", "shipp_mob": "", "shipp_code": "", "shipp_state": "", "shipp_city": "", "shipping_address": "",};
  states: any = [];
  statesdetails: any = [];
  cities: any = [];
  citiesdetails: any = [];
  responseData2: any;
  constructor(public navCtrl: NavController, public navParams: NavParams,
    private formBuilder: FormBuilder, public restProvider: RestapiProvider,
    private storage: Storage) {
      this.shippingdet = this.formBuilder.group({
        shipping_name: ['', Validators.required],
        shipp_mob: ['', Validators.required],
        shipp_code: ['', Validators.required],
        shipp_state: ['', Validators.required],
        shipp_city: ['', Validators.required],
        shipping_address: ['', Validators.required],
      });

      this.getAllStates();
  }
  getShippingDetails()
  {
    //console.log(this.userData);
    this.storage.get("ID").then((val) =>
    {
      if(val)
      {
       this.addShippingUsers(val);
      }
      else
      {
        console.log("Please Login");
      }
    });
    this.closeModal();
    // this.navCtrl.setRoot(this.navCtrl.getActive().component);

  }

  getAllStates()
  {
    this.restProvider.getstates()
      .then(data => {
      this.states = data;
      this.statesdetails = this.states.msg.states;
      //console.log(this.statesdetails);
      });
  }

  onChange(selectedstate){
    //console.log("Selected:", selectedstate);
    this.getAllCities(selectedstate);
  }

  getAllCities($cid)
  {
    this.restProvider.getcities($cid)
      .then(data => {
      this.cities = data;
      this.citiesdetails = this.cities.msg.city;
      //console.log(this.citiesdetails);
      });
  }

  addShippingUsers($usid)
  {
    this.shippingdet.controls;
    this.restProvider.addshipping(this.userData, 'delivery_address/'+$usid).subscribe((data) => {
      console.log(data);
      if (data) {
        this.responseData2 = data;
        //console.log(this.responseData2.msg);
      }
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ShippingPage');
  }

  closeModal() {
    this.navCtrl.pop();
  }

}
