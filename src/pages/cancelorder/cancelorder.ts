import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { RestapiProvider } from '../../providers/restapi/restapi';
import { Storage } from '@ionic/storage';

/**
 * Generated class for the CancelorderPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-cancelorder',
  templateUrl: 'cancelorder.html',
})
export class CancelorderPage {
  cancelorderde : FormGroup;
  orderpa: any;
  orderidn: any;
  responseEdit: any;
  constructor(public navCtrl: NavController, public navParams: NavParams,
    private formBuilder: FormBuilder, public restProvider: RestapiProvider,
    private storage: Storage) {
      this.cancelorderde = this.formBuilder.group({
        name: ['', Validators.required],
        account_no: ['', Validators.required],
        bank_name: ['', Validators.required],
        bank_branch: ['', Validators.required],
        ifsc_code: ['', Validators.compose([
          Validators.required,
          Validators.pattern('^[A-Za-z]{4}[a-zA-Z0-9]{7}$')
        ])],
        mobile_no: ['', Validators.compose([
          Validators.maxLength(10),
          Validators.minLength(10),
          Validators.required
        ])],
        reason: ['', Validators.required],
        remark: ['', Validators.required],
      });

     this.orderpa = navParams.get('orderno');
     this.orderidn = navParams.get('orderid');
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CancelorderPage');
  }

  cancelorderDetails()
  {
     //console.log(this.cancelorderde.value.name);
     this.storage.get("ID").then((val) =>
    {
      if(val)
      {
        let cancelorder = {
          order_id: this.orderidn,
          user_id: val,
          name: this.cancelorderde.value.name,
          acc_no: this.cancelorderde.value.account_no,
          bank_name: this.cancelorderde.value.bank_name,
          bank_branch: this.cancelorderde.value.bank_branch,
          ifsccode: this.cancelorderde.value.ifsc_code,
          mobile_no: this.cancelorderde.value.mobile_no,
          cancellation_reason: this.cancelorderde.value.reason,
          remark: this.cancelorderde.value.remark,
        };
        this.restProvider.cancelorderf(cancelorder, 'insert_cancel_order/'+this.orderidn+'/'+val).subscribe((data) => {
          //console.log(data);
          if (data) {
            this.responseEdit = data;
            console.log(this.responseEdit.msg);
          }
        });
        this.closeModal();
      }
    });
  }

  closeModal() {
    this.navCtrl.pop();
  }


}
