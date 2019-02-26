import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {Validators, FormBuilder, FormGroup } from '@angular/forms';
import { RestapiProvider } from '../../providers/restapi/restapi';
import { Storage } from '@ionic/storage';

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
  editdeta: any;
  editMode: boolean = false;
  editid: any;
  responseEdit: any;
  constructor(public navCtrl: NavController, public navParams: NavParams,
    private formBuilder: FormBuilder, public restProvider: RestapiProvider,
    private storage: Storage) {
      this.shippingdet = this.formBuilder.group({
        shipping_name: ['', Validators.required],
        shipp_mob: ['', Validators.compose([
          Validators.maxLength(10),
          Validators.minLength(10),
          Validators.required
        ])],
        shipp_code: ['', Validators.required],
        shipp_state: ['', Validators.required],
        shipp_city: ['', Validators.required],
        shipping_address: ['', Validators.required],
      });

      if(navParams.get('itm'))
      {
        //console.log(navParams.get('itm'));
        this.editMode = true;
        this.editdeta = navParams.get('itm');
        //console.log(this.editdeta);
        this.getAllCities(this.editdeta.state_id);
        this.editshippingUser();
      }
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
       this.closeModal();
      }
      else
      {
        console.log("Please Login");
      }
    });

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
      //console.log(data);
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

  editshippingUser()
  {
    //console.log("edit");
    this.userData.shipping_name = this.editdeta.name;
    this.userData.shipp_mob = this.editdeta.mobile;
    this.userData.shipp_code = this.editdeta.pincode;
    this.userData.shipp_state = this.editdeta.state_id;
    this.userData.shipp_city = this.editdeta.city_id;
    this.userData.shipping_address = this.editdeta.address;
    this.editid = this.editdeta.id;
  }

  updateShippingUser()
  {
    this.editid = this.editdeta.id;
    this.shippingdet.controls;
    this.storage.get("ID").then((val) =>
    {
      if(val)
      {
        let updateshipping = {
          name: this.userData.shipping_name,
          mobile: this.userData.shipp_mob,
          pincode: this.userData.shipp_code,
          state: this.userData.shipp_state,
          city: this.userData.shipp_city,
          address: this.userData.shipping_address,
        };
        this.restProvider.editUpshipping(updateshipping, 'update_address/'+this.editid+'/'+val).subscribe((data) => {
          //console.log(data);
          if (data) {
            this.responseEdit = data;
            //console.log(this.responseEdit.msg);
          }
        });
        this.closeModal();
      }
    });

  }

}
